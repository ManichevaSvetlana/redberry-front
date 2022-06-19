import ResourceService from '../../services/resources';

export const resources = {
    namespaced: true,
    state: {
        array: [],
        lastPage: null,
        total: null
    },
    actions: {
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
