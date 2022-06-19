import api from './api';

class Auth {

    login({email, password}) {
        return api.post('/login', {email, password}).then((response) => {
            return response.data;
        });
    }

    logout() {
        return api.post('/logout');
    }

    register({name, email, password}) {
        return api.post('/register', { name, email, password }).then((response) => {
            return response.data;
        });
    }

    fetchUser() {
        return api.get('/user').then((response) => {
            return response.data;
        });
    }


}

export default new Auth();
