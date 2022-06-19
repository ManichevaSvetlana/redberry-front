<template>
  <div class="h-screen md:flex">
    <div
        class="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
      <div>
        <h1 class="text-white font-bold text-4xl font-sans">Redberry Covid19</h1>
        <p class="text-white mt-1">Covid Statistics in Real Time</p>
      </div>
      <div class="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      <div class="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      <div class="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      <div class="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
    </div>
    <div class="flex md:w-1/2 justify-center py-10 items-center bg-white">
      <form class="bg-white" @submit.prevent="handleRegister">
        <h1 class="text-gray-800 font-bold text-2xl mb-3">Create a new Account</h1>
        <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
          </svg>
          <input class="pl-2 outline-none border-none" type="text" name="" id="name" placeholder="Full Name" v-model="user.name"/>
        </div>
        <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
          <input class="pl-2 outline-none border-none" type="text" name="" id="email" placeholder="Email Address" v-model="user.email"/>
        </div>
        <div class="flex items-center border-2 py-2 px-3 rounded-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
          </svg>
          <input class="pl-2 outline-none border-none" type="password" name="" id="password" placeholder="Password" v-model="user.password"/>
        </div>

        <div class="text-red-700 text-center mt-3 relative" v-if="message">
          <span class="block sm:inline">{{ message }}</span>
        </div>

        <button type="submit" class="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2" :disabled="loading">Register</button>
        <router-link to="/register"  class="text-sm ml-2 text-gray-600 hover:text-blue-500 cursor-pointer">Login to an existing account</router-link>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: "RegisterComponent",
  data() {
    return {
      successful: false,
      loading: false,
      message: '',
      user: {
        name: null, email: null, password: null
      }
    };
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.successful = false;
      this.loading = true;

      this.$store.dispatch('user/register', this.user).then(
          (data) => {
            this.message = data.message;
            this.successful = true;
            this.loading = false;
          },
          (error) => {
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            this.successful = false;
            this.loading = false;
          }
      );
    },
  },
};
</script>

<style scoped>

</style>
