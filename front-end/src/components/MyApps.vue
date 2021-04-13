<template>
<div class="main">
  <div class="menu">
    <p><a @click="toggleUpload">New Application</a></p>
    <h2>{{user.firstName}} {{user.lastName}} <a @click="logout"><i class="fas fa-sign-out-alt"></i></a></h2>
    <uploader :show="show" @close="close" @uploadFinished="uploadFinished" />
  </div>
  <all-apps :applications="applications" />
  <p v-if="error">{{error}}</p>
</div>
</template>

<script>
import axios from 'axios';
import Uploader from '@/components/Uploader.vue';
import AllApps from '@/components/AllApps.vue';
export default {
  name: 'MyApps',
  components: {
    Uploader,
    AllApps
  },
  data() {
    return {
      show: false,
      applications: [],
      error: '',
    }
  },
  created() {
    this.getApplications();
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    async getApplications() {
      try {
        this.response = await axios.get("/api/applications");
        this.applications = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    close() {
      this.show = false;
    },
    toggleUpload() {
      this.show = true;
    },
    async uploadFinished() {
      this.show = false;
      this.getApplications();
    },
  }
}
</script>

<style scoped>
.menu {
  margin: -8em 0 0 0;
  display: flex;
  justify-content: space-between;
}

a {
  cursor: pointer;
}

p {
  margin-left: 120px;
}

.menu h2 {
  font-size: 14px;
}
</style>