import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000'
});

axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';
//below are the code for interceptors
//Interceptors allow you to step in before a request is sent or a response is
// received and execute the code you want or modify the request or response or handle errors.
axiosInstance.interceptors.response.use(response => {
    // code to be excuted.
    return response;
}, error => {

});

axiosInstance.interceptors.request.use(request => {
    // code to be executed
    return request;
}, error => {

});

export default axiosInstance