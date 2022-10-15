import axios from 'axios';
import { store }  from "./Store";

const instance = axios.create({
  	baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use(async (config) => {
    const token = store.getState()?.auth?.user?.accessToken || ''
    if (token) config.headers.Authorization = `${token}`;
    return config;
  	},(err) => {
    	return Promise.reject(err);
  	}
)

export default instance;