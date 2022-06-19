import { createStore } from 'vuex';
import { user } from './modules/user';

const store = createStore({
  modules: {
    user,
  },
  mutations: {
    initialiseStore(state) {
      // Get the token from local storage
      const token = localStorage.getItem('token')
      if (token && token.length) {
        state.user.token = token;
        this.dispatch('user/getData')
      }
    },
  }
});

export default store;
