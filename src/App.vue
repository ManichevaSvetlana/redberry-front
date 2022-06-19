<template>
  <div id="app">
    <button @click="logOut">Logout</button>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>

export default {
  computed: {

  },
  methods: {
    logOut() {
      this.$store.dispatch('user/logout');
      // this.$router.push('/login');
    }
  }
};
</script>
