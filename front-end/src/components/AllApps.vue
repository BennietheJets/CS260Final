<template>
<div>
  <section class="all-applications">
    <div class="application" v-for="application in applications" v-bind:key="application._id">
      <router-link :to="{ name: 'application', params: { id: application._id }}" @click="setID()">
      <div class="applicationInfo">
        <p class="applicationTitle">{{application.title}}</p>
        <p class="applicationName">{{application.user.firstName}} {{application.user.lastName}}</p>
      </div>
      </router-link>
      <p>{{application.company}}</p>
      <p>{{application.pay}}</p>
      <br />
      <p>{{application.description}}</p>
      <p class="applicationDate">{{formatDate(application.created)}}</p>
    </div>
  </section>
</div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'AllApps',
  props: {
    applications: Array
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
    setID() {
      this.$root.$data.application = this.application;
    }
  }
}
</script>

<style scoped>
.applicationInfo {
  margin-top: 150px;
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
}

.applicationInfo p {
  margin: 0px;
}

.applicationDate {
  font-size: 0.7em;
  font-weight: normal;
}

p {
  margin: 0px;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  column-gap: 1em;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  width: 100%;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}
</style>