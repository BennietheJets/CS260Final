<template lang="html">
  <div class="box">
    <button @click="deleteApplication()" class="pure-button pure-button-primary left delete">Delete</button>
    <div class="image" v-for="application in applications" :key="application._id">
      <h2>{{application.title}}</h2>
      <h3>{{application.company}}</h3>
      <h3>{{application.pay}}</h3>
      <h4>Uploaded by {{application.user.username}}, {{formatDate(application.created)}}</h4>
      <p>{{application.description}}</p>
      <p>{{application.questions}}</p>
      <p v-if="error">{{error}}</p>
    </div>
    <button @click="editApplication()" class="pure-button pure-button-primary right">Edit</button>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
  name: 'Application',
  data() {
    return {
      id: '',
      applications: [],
      error: ''
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.getApplication();
  },
  methods: {
    async getApplication() {
      try {
        let response = await axios.get("/api/applications/" + this.id);
        this.applications = response.data
      } catch (e) {
        this.error = e.response.data.message;
        console.log(e);
      }
    },
    async editApplication() {
      try {
        await axios.put("/api/applications/" + this.id, {
          title: this.findItem.title,
          company: this.findItem.company,
          pay: this.findItem.pay,
          questions: this.findItem.questions,
          description: this.findItem.description,
        });
        this.findItem = null;
        this.getApplication();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteApplication() {
      try {
        await axios.delete("/api/applications/" + this.id);
        this.findItem = null;
        this.getApplication();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    }
  }
}
</script>

<style scoped>
.box {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
}

h3 {
  margin-left: 30px;
  margin-right: 10px;
}

.delete{
  background-color: rgb(240, 57, 57);
}

.image {
  margin-top: 40px;
  box-shadow: 5px 10px 12px black;
}

.image h2 {
  margin-left: 10px;
  margin-right: 10px;
  padding-left: 20px;
  border-bottom: 1px solid black;
  font-size: 2em;
}

.image h4 {
  margin-top: -30px;
  text-align: right;
  padding-right: 10px;
}

.image p {
  font-size: 1.5em;
  padding-left: 30px;
}

.image img {
  height: 550px;
}
</style>
