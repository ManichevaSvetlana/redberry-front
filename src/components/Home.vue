<template>
  <div class="container">
    <div class="locale-switcher">🌐 {{$i18n.locale}}</div>
    <select v-model="$i18n.locale">
      <option value="en">English</option>
      <option value="ka">Georgian</option>
    </select>

    {{ $t('message') }} <br><br>

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
