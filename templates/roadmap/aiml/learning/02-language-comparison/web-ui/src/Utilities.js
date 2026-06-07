import { createBrowserHistory } from 'history';
import axios from 'axios';
import { store } from './Store';
import { toast } from 'react-toastify';

const instance = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use(
	async (config) => {
		const decryptedUser = store.getState()?.auth?.user ? store.getState()?.auth?.user : null;
		const token = decryptedUser?.accessToken || '';
		if (token) config.headers.Authorization = `${token}`;
		if (config.body && process.env.REACT_APP_DEBUG === 'false') {
			config.data = { payload: config.body };
		} else {
			config.data = config.body
		}
		return config;
	},
	(err) => {
		return Promise.reject(err);
	},
);

instance.interceptors.response.use(
	(response) => {
		console.log("response", response)
		if (response.data && process.env.REACT_APP_DEBUG === 'false') {
			response.data.data = response?.data;
		}
		return response?.data;
	},
	(err) => {
		if (err.response?.data && process.env.REACT_APP_DEBUG === 'false') {
			err.response.data.data = err.response.data;
		}
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
	if (typeof error.data == 'object') {
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
