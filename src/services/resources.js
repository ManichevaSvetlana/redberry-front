import api from './api';

class Resources {

    perPage = 10

    fetchResources(page, searchString = null) {
        if(searchString) searchString = '&' + searchString;
        return api.get('/countries?per_page=' + this.perPage + '&page=' + page + searchString).then((response) => {
            return response.data;
        });
    }

    fetchResource(code) {
        return api.get('/countries/' + code).then((response) => {
            return response.data;
        });
    }


}

export default new Resources();
