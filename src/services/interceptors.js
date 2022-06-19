import axiosInstance from './api';
import i18n from "@/i18n";

const setup = (store) => {
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = store.state.user.token;
            if (token) {
                config.headers['Authorization'] = 'Bearer ' + token;
                config.headers['Accept-Language'] = i18n.global.locale;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            const originalConfig = err.config;

            if (err.response) {
                // Check if token needs to be refreshed
                if (err.response.status === 577 && !originalConfig._retry) {
                    originalConfig._retry = true;
                    try {
                        // Set the new token and retry the request
                        store.dispatch('user/setToken', err.response.data.token);
                        return axiosInstance(originalConfig);
                    } catch (_error) {
                        store.dispatch('user/resetData');
                        return Promise.reject(_error);
                    }
                }

                if(err.response.status === 401) store.dispatch('user/resetData');
            }

            return Promise.reject(err);
        }
    );
};

export default setup;
