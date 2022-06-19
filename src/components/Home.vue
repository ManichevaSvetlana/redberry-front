<template>
  <div class="container">
    <h1 class="text-3xl font-bold underline">
      Hello world!
    </h1>
    {{ user.name }} <br>
    {{ user.email }} <br>
    {{ user.token }}
  </div>
</template>

<script>
export default {
  name: 'HomeComponent',
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {

  }
};
</script>
