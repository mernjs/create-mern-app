import { createBrowserHistory } from 'history';
import axios from 'axios';
import { store } from './Store';
import { toast } from 'react-toastify';
import qs from 'qs';

const API_URL = "https://abc.com/v1"

const instance = axios.create({
	baseURL: API_URL,
});

instance.interceptors.request.use(
	async (config) => {
		const decryptedUser = store.getState()?.auth?.user ? store.getState()?.auth?.user : null;
		const token = decryptedUser?.accessToken || '';
		if (token) config.headers.Authorization = `${token}`;
		if (config.body) {
			config.data = qs.stringify(config.body);
		}
		return config;
	},
	(err) => {
		return Promise.reject(err);
	},
);

instance.interceptors.response.use(
	(response) => {
		return response;
	},
	(err) => {
		return Promise.reject(err.response.data);
	},
);

export default instance;

export const history = createBrowserHistory();

export const showToast = (message, type) => {
	if (type === 'error') toast.error(message);
	if (type === 'success') toast.success(message);
};

export const handleFormError = (error, setError) => {
	if (typeof error.data === 'object') {
		Object.keys(error.data).forEach((field) => {
			setError(field, {
				type: 'server',
				message: error.data[field],
			});
		});
	} else {
		showToast(error?.message || 'An error occurred', 'error');
	}
};
