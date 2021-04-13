<template>
<transition v-if="show" name="modal">
  <div class="modal-mask">
    <div class="modal-container">
      <form class="pure-form" @submit.prevent="editApplication">
        <legend>Edit application (I did not get the edit to work, I'm as disappointed as you are....)</legend>
        <fieldset>
          <input v-model="title" placeholder="Title">
        </fieldset>
        <fieldset>
          <input v-model="company" placeholder="Company">
        </fieldset>
         <fieldset>
          <input v-model="pay" placeholder="Pay">
        </fieldset>
        <fieldset>
          <textarea v-model="description" placeholder="Description"></textarea>
        </fieldset>
        <fieldset>
          <textarea v-model="questions" placeholder="Enter questions to ask during an interview to this company"></textarea>
        </fieldset>
        <fieldset class="checks">
          <input type="checkbox" id="interviewed1" value="true" v-model="interviewed1">
          <label for="interviewed1">First Interview</label>
          <input type="checkbox" id="interviewed2" value="true" v-model="interviewed2">
          <label for="interviewed2">Second Interview</label>
          <input type="checkbox" id="offered" value="true" v-model="offered">
          <label for="offered">Offered Position</label>
          <input type="checkbox" id="accepted" value="true" v-model="accepted">
          <label for="accepted">Accepted Position</label>        
        </fieldset>
        <fieldset class="buttons">
          <button type="button" @click="close" class="pure-button">Close</button>
          <button type="submit" @click="editApplication(application.title, application.company, application.pay, application.description, application.questions)" class="pure-button pure-button-primary right">Edit</button>
        </fieldset>
      </form>
    </div>
  </div>
</transition>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Editor',
  props: {
    show: Boolean,
  },
  data() {
    return {
      title: '',
      company: '',
      pay: '',
      description: '',
      questions: '',
      interviewed1: '',
      interviewed2: '',
      offered: '',
      accepted: '',
      error: '',
      id: '',
      application: null,
    }
  },
  created() {
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
  close() {
    this.$emit('close');
  },
  async editApplication(title, company, pay, questions, description) {
      try {
        await axios.put("/api/applications/" + this.id, {
          title: title,
          company: company,
          pay: pay,
          description: description,
          questions: questions,
        });
        this.findItem = null;
        this.getApplication();
        this.$emit('editFinished');
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
/* Modals */
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .3);
  transition: opacity 0.5s ease;
  display: flex;
  transition: background 0.2s ease-in-out, height 1s ease-in-out;
  transition: height 0.2s ease-in-out, width 0.2s ease-in-out;
  justify-content: center;
  transition-timing-function: cubic-bezier(0.64, 0.57, 0.67, 1.53);
}

.modal-container {
  width: 50%;
  height: max-content;
  margin-top: 80px;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all 0.5s ease;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

/* Form */

form {
  font-size: 11pt;
}

input {
  width: 100%;
}

textarea {
  width: 100%;
  height: 100px;
}

.placeholder {
  background: #F0F0F0;
  width: 200px;
  height: 125px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 14px;
  cursor: pointer;
}

.placeholder:hover {
  background: #E0E0E0;
}

.fileInput {
  display: none;
}

img {
  width: 200px;
}

label {
  margin-left: -10em;
}

.checks {
  display: flex;
  justify-content:left;
}

.buttons {
  display: flex;
  justify-content: space-between;
}
</style>