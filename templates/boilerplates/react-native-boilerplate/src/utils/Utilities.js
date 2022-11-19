import axios from 'axios';
import { stopSubmit, startSubmit, reset } from 'redux-form';
import { store } from './Store';
import _ from 'lodash';
import Toast from 'react-native-toast-message';
import { CoreActions } from '../reducers/CoreReducer';

export const apiRequest = async (args = {}) => {
  console.log('auth', store.getState().auth);
  let API_URL = 'https://mernjs-nodejs.herokuapp.com/api/v1';
  args.url = `${API_URL}/${args.url}`;
  return axios({
    ...args,
    headers: {
      token: 'token'
    }
  });
};

export const formSubmitStart = (formName) => {
  store.dispatch(startSubmit(formName));
};

export const formSubmitError = (formName, error) => {
  if (!_.isEmpty(error) && !_.isEmpty(error.response)) {
    if (!_.isEmpty(error.response.data.data)) {
      store.dispatch(stopSubmit(formName, error.response.data.data));
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        position: 'bottom',
        text2: error.response.data.message
      });
    }
  } else {
    Toast.show({
      type: 'error',
      text1: 'Error',
      position: 'bottom',
      text2: error.message
    });
  }
};

export const formSubmitSuccess = (formName, message) => {
  store.dispatch(reset(formName));
  Toast.show({
    type: 'success',
    text1: 'Success',
    position: 'bottom',
    text2: message
  });
};

export const requestStart = (loaderName) => {
  store.dispatch(CoreActions.loaderActivate(loaderName));
};

export const requestError = (loaderName, message) => {
  store.dispatch(CoreActions.loaderDeactivate(loaderName));
  if (message) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      position: 'bottom',
      text2: message
    });
  }
};

export const requestSuccess = (loaderName, message) => {
  store.dispatch(CoreActions.loaderDeactivate(loaderName));
  if (message) {
    Toast.show({
      type: 'success',
      text1: 'Success',
      position: 'bottom',
      text2: message
    });
  }
};

export const showToast = (message, type) => {
  if (type === 'error') {
    Toast.show({
      type: 'error',
      text1: 'Error',
      position: 'bottom',
      text2: message
    });
  }
  if (type === 'success') {
    Toast.show({
      type: 'success',
      text1: 'Success',
      position: 'bottom',
      text2: message
    });
  }
};

export default CoreActions;
