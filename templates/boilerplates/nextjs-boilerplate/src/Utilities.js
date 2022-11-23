import { createMemoryHistory } from 'history';
import { createBrowserHistory as createHistory } from 'history';
import axios from 'axios';
import store from './Store';
import _ from 'lodash';
import { toast } from 'react-toastify';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

instance.interceptors.request.use(
  async (config) => {
    const token = store.getState()?.auth?.user?.accessToken || '';
    if (token) config.headers.Authorization = `${token}`;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

export default instance;

export const history =
  typeof window === 'undefined' ? createMemoryHistory() : createHistory();

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
