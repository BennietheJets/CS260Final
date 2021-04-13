<template>
<div class="home">
  <all-apps :applications="applications" />
  <p v-if="error">{{error}}</p>
</div>
</template>

<script>
import axios from 'axios';
import AllApps from '@/components/AllApps.vue';
export default {
  name: 'Home',
  components: {
    AllApps
  },
  data() {
    return {
      applications: [],
      error: '',
    }
  },
  created() {
    this.getApplications();
  },
  methods: {
    async getApplications() {
      try {
        let response = await axios.get("/api/applications/all");
        this.applications = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
  }
}
</script>
