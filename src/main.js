import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './index.css'

import setupInterceptors from './services/interceptors';
import i18n from './i18n'
setupInterceptors(store);

createApp({
    extends: App,
    beforeCreate() {
        this.$store.commit('initialiseStore')
    }}).use(i18n)
    .use(router)
    .use(store)
    .mount('#app');
