import axios from 'axios';
const API_URL='https://jsonplaceholder.typicode.com'

export const ajaxRequest = (args={}) =>{
    args.url = `${API_URL}/${args.endPoint}`
    return axios({...args, headers: {} });
}
