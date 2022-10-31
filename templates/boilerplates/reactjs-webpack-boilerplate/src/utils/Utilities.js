import { createBrowserHistory } from 'history';
import axios from "axios";
import { stopSubmit, startSubmit, reset } from 'redux-form';
import { store }  from "./Store";
import _ from 'lodash'
import { toast } from 'react-toastify';
import { CoreActions } from '../reducers/CoreReducer'

export const history = createBrowserHistory();

export const forwardTo = (path) => {
    history.push(path)
}

export const apiRequest = async (args = {}) => {
	args.url = `${process.env.REACT_APP_API_URL}/${args.url}`
    return axios({
        ...args, 
        headers: {
            'authorization': store.getState()?.auth?.user?.accessToken || ''
        }
    })
}

export const formSubmitStart = (formName) => {
    store.dispatch(startSubmit(formName))
}

export const formSubmitError = (formName, error) => {
    if(!_.isEmpty(error) && !_.isEmpty(error.response)){
        if(!_.isEmpty(error.response.data.data)){
            store.dispatch(stopSubmit(formName, error.response.data.data))
        }else{
            toast.error(error.response.data.message)
        }
    }else{
        toast.error(error.message)
    }
}

export const formSubmitSuccess = (formName, message) => {
    store.dispatch(reset(formName))
    toast.success(message)
}

export const requestStart = (loaderName) => {
    store.dispatch(CoreActions.loaderActivate(loaderName))
}

export const requestError = (loaderName, message) => {
    store.dispatch(CoreActions.loaderDeactivate(loaderName))
    if(message) toast.error(message)
}

export const requestSuccess = (loaderName, message) => {
    store.dispatch(CoreActions.loaderDeactivate(loaderName))
    if(message) toast.success(message)
}

export const showToast = (message, type) => {
    if(type === 'error'){
        toast.error(message)    
    }
    if(type === 'success'){
        toast.success(message)    
    }
    
}


export default CoreActions