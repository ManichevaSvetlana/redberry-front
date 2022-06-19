import {createWebHistory, createRouter} from 'vue-router';

import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Home from './components/Home.vue';

import middleware from './middleware';

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            middleware: {
                guest: true
            }
        },
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            middleware: {
                guest: true
            }
        },
    },
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            middleware: {
                auth: true
            }
        },
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

middleware(router);

export default router;
