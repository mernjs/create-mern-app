import { createBrowserHistory } from 'history';
import axios from 'axios';
import { store } from './Store';
import { toast } from 'react-toastify';
import CryptoJS from 'crypto-js';

export const encrypt = (data) => {
	try {
		if (!data || process.env.REACT_APP_DEBUG === 'true') return data;
		return CryptoJS.AES.encrypt(JSON.stringify(data), process.env.REACT_APP_ENCRYPTION_SECRET_KEY).toString();
	} catch (error) {
		console.log(error);
	}
};

export const decrypt = (body) => {
	try {
		if (!body || process.env.REACT_APP_DEBUG === 'true') return body;
		const bytes = CryptoJS.AES.decrypt(body.data, process.env.REACT_APP_ENCRYPTION_SECRET_KEY);
		return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
	} catch (error) {
		console.log(error);
	}
};

const instance = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use(
	async (config) => {
		const token = store.getState()?.auth?.user?.accessToken || '';
		if (token) config.headers.Authorization = `${token}`;
		if (config.data && process.env.REACT_APP_DEBUG === 'false') {
			config.data = { payload: encrypt(config.data) };
		}
		return config;
	},
	(err) => {
		return Promise.reject(err);
	},
);

instance.interceptors.response.use(
	(response) => {
		if (response.data && process.env.REACT_APP_DEBUG === 'false') {
			response.data.data = decrypt(response.data);
		}
		return response.data;
	},
	(err) => {
		if (err.response.data && process.env.REACT_APP_DEBUG === 'false') {
			err.response.data.data = decrypt(err.response.data);
		}
		return Promise.reject(err.response.data);
	},
);

export default instance;

export const history = createBrowserHistory();

export const requestStart = (loaderName) => {
	store.dispatch(CoreActions.loaderActivate(loaderName));
};

export const requestError = (loaderName, message) => {
	store.dispatch(CoreActions.loaderDeactivate(loaderName));
	if (message) toast.error(message);
};

export const requestSuccess = (loaderName, message) => {
	store.dispatch(CoreActions.loaderDeactivate(loaderName));
	if (message) toast.success(message);
};

export const showToast = (message, type) => {
	if (type === 'error') toast.error(message);
	if (type === 'success') toast.success(message);
};
