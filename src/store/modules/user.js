import AuthService from '../../services/auth';
import router from '../../router';

export const user = {
    namespaced: true,
    state: {
        name: '',
        email: '',
        token: '',
        expiration: null
    },
    actions: {
        resetData({commit})
        {
            commit('logout');
        },
        setToken({commit}, token) {
            commit('token', token);
        },
        setData({commit}, data) {
            commit('data', data);
        },
        getData({commit}) {
            AuthService.fetchUser().then(user => {
                commit('data', user.user);
            })
        },
        login({commit, dispatch}, user) {
            return AuthService.login(user).then(
                response => {
                    commit('loginSuccess', response);
                    dispatch('getData');
                    return Promise.resolve(response);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        logout({commit}) {
            AuthService.logout().then(response => {
                commit('logout', response);
            });
        },
        register({commit,dispatch}, user) {
            return AuthService.register(user).then(
                response => {
                    commit('loginSuccess', response);
                    dispatch('getData');
                    return Promise.resolve(response);
                },
                error => {
                    return Promise.reject(error);
                }
            );
        }
    },
    mutations: {
        data(state, user) {
            state.name = user.name;
            state.email = user.email;
        },
        token(state, token) {
            state.token = token;
            localStorage.setItem('token', token)
        },
        loginSuccess(state, user) {
            this.commit('user/token', user.token);

            router.push({name: 'home'});
        },
        loginFailure() {
            this.commit('user/data', {name: null, email: null});
        },
        logout(state) {
            this.commit('user/data', {name: null, email: null});
            state.token = null;
            localStorage.removeItem('token')

            router.push({name: 'login'});
        },
    }
};
