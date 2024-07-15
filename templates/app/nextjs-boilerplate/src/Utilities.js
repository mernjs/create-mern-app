import axios from 'axios';
import { store } from '@/Store';
import { toast } from 'react-toastify';
import CryptoJS from 'crypto-js';

export const encrypt = (data) => {
	try {
		if (!data || process.env.NEXT_PUBLIC_DEBUG === 'true') return data;
		return CryptoJS.AES.encrypt(JSON.stringify(data), process.env.NEXT_PUBLIC_ENCRYPTION_SECRET_KEY).toString();
	} catch (error) {
		console.log(error);
	}
};

export const decrypt = (body) => {
	try {
		if (!body?.data) return null
		if (!body?.data || process.env.NEXT_PUBLIC_DEBUG === 'true') return body;
		const bytes = CryptoJS.AES.decrypt(body.data, process.env.NEXT_PUBLIC_ENCRYPTION_SECRET_KEY);
		return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
	} catch (error) {
		console.log(error);
	}
};

const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});

instance.interceptors.request.use(
	async (config) => {
		const decryptedUser = store.getState()?.auth?.user ? decrypt({ data: store.getState()?.auth?.user }) : null;
		const token = decryptedUser?.accessToken || '';
		if (token) config.headers.Authorization = `${token}`;
		if (config.body && process.env.NEXT_PUBLIC_DEBUG === 'false') {
			config.data = { payload: encrypt(config.body) };
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
		if (response.data && process.env.NEXT_PUBLIC_DEBUG === 'false') {
			response.data.data = decrypt(response.data);
		}
		return response.data;
	},
	(err) => {
		if (err.response.data && process.env.NEXT_PUBLIC_DEBUG === 'false') {
			err.response.data.data = decrypt(err.response.data);
		}
		return Promise.reject(err.response.data);
	},
);

export default instance;

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
