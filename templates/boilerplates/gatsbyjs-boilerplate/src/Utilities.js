import { createBrowserHistory } from 'history';
import axios from 'axios';
import { toast } from 'react-toastify';

const instance = axios.create({
    baseURL: 'https://iuqkny-8080.preview.csb.app/api',
});

instance.interceptors.request.use(
    async (config) => {
        // const token = store.getState()?.auth?.user?.accessToken || '';
        const token = '';
        if (token) config.headers.Authorization = `${token}`;
        return config;
    },
    (err) => {
        return Promise.reject(err);
    },
);

export default instance;

export const history = createBrowserHistory();

export const requestStart = (loaderName) => {};

export const requestError = (loaderName, message) => {};

export const requestSuccess = (loaderName, message) => {
    if (message) toast.success(message);
};

export const showToast = (message, type) => {
    if (type === 'error') toast.error(message);
    if (type === 'success') toast.success(message);
};
