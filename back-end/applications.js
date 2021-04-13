const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const multer = require('multer')
const upload = multer({
  dest: '/var/www/photobomb.benniesorensen.com/images/',
  limits: {
    fileSize: 50000000
  }
});

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const applicationSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    title: String,
    company: String,
    pay: String,
    description: String,
    questions: String,
    created: {
      type: Date,
      default: Date.now
    },
  });
  
  const Application = mongoose.model('Application', applicationSchema);


  router.post("/", validUser, upload.single('application'), async (req, res) => {
    const application = new Application({
      user: req.user,
      title: req.body.title,
      description: req.body.description,
      company: req.body.company,
      pay: req.body.pay,
      questions: req.body.questions,
    });
    try {
      await application.save();
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

  router.put('/:id', validUser, upload.single('application'), async (req, res) => {
    try {
      let application = await Application.findOne({
        _id : req.params.id
      });
      user = req.user,
      appliction.title = req.body.title;
      application.description = req.body.description;
      application.company = req.body.company;
      application.pay = req.body.pay;
      applications.questions = req.body.questions;
      application.save();
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

router.get("/", validUser, async (req, res) => {
    try {
      let applications = await Application.find({
        user: req.user
      }).sort({
        created: -1
      }).populate('user');
      return res.send(applications);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

router.get("/all", async (req, res) => {
    try {
      let applications = await Application.find().sort({
        created: -1
      }).populate('user');
      return res.send(applications);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

  router.get("/:id", async (req,res) => {
    try {
      let application = await Application.findOne({
        _id: req.params.id
      }).populate('user');
      return res.send({
        application: application
      });
  
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      await Application.deleteOne({
        _id: req.params.id
      })
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    } 
  });

  module.exports = {
    model: Application,
    routes: router,
  }