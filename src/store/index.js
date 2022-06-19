import { createStore } from 'vuex';
import { user } from './modules/user';
import { resources } from './modules/resources';
import { resource } from './modules/resource';

const store = createStore({
  modules: {
    user,
    resources,
    resource
  },
  mutations: {
    initialiseStore(state) {
      // Get the token from local storage
      const token = localStorage.getItem('token')
      if (token && token.length) {
        state.user.token = token;
        // Get the user's data
        this.dispatch('user/getData')
      }
    },
  }
});

export default store;
