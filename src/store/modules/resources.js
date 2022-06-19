import ResourceService from '../../services/resources';

export const resources = {
    namespaced: true,
    state: {
        array: [],
        lastPage: null,
        total: null,

        totalInformation: {death: 0, confirmed: 0, recovered: 0}
    },
    actions: {
        getTotalInformation({commit}) {
            ResourceService.fetchTotal().then(data => {
                commit('total', data);
            })
        },
        getData({commit}, {searchString}) {
            ResourceService.fetchResources(1, searchString).then(data => {
                commit('data', data.data);
                commit('pagination', data);
            })
        },
        loadMore({commit}, {page, searchString}) {
            ResourceService.fetchResources(page, searchString).then(data => {
                commit('addData', data.data);
                commit('pagination', data);
            })
        },
    },
    mutations: {
        total(state, data) {
            state.totalInformation = data;
        },
        data(state, array) {
            state.array = array;
        },
        pagination(state, data)
        {
            state.lastPage = data.last_page;
            state.total = data.total;
        },
        addData(state, array) {
            state.array = state.array.concat(array);
        }
    }
};
