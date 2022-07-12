import axios from 'axios';
import { getToken, removeUserSession } from './Auth';
const request_config_capture = function (config) {
    config['headers']['Authorization'] = getToken();
    return config;
}
const request_error_capture = function (error) {
    return Promise.reject(error);
}
const response_capture = function (response) {
    return response;
}
const response_error_capture = function (error) {
    var err = ''
    try {
        err = error.response.data;
        if (error.response.status === 401) {
            console.log(`${err}`, 3, null, false);
            removeUserSession();
            //window.location.reload()
        } else if (error.response.status === 403) {
            console.log.fail(`${err}`, 3, null, false);
        } else {
            console.log(`${err} ${error}`, 1, null, false);
        }
    } catch (e) {
        err = " - ";
        console.log(`${err} ${error}`);
    }
    return Promise.reject(error);
}
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
let baseURL = API_ENDPOINT;
let config = {
    baseURL: baseURL,
};
let API = axios.create(config);
API.interceptors.request.use(request_config_capture, request_error_capture);
API.interceptors.response.use(response_capture, response_error_capture);
export { API }