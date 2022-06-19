import ResourceService from '../../services/resources';

export const resource = {
    namespaced: true,
    state: {
        code: null,
        name_local: null,
        confirmed: null,
        death: null,
        recovered: null,
    },
    actions: {
        getData({commit}, code) {
            ResourceService.fetchResource(code).then(data => {
                commit('data', data);
            })
        },
    },
    mutations: {
        data(state, data) {
            state.name_local = data.name_local;
            state.confirmed = data.confirmed;
            state.death = data.death;
            state.recovered = data.recovered;
            state.code = data.code;
        }
    }
};
