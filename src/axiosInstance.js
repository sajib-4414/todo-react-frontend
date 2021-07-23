import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000'
});

axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';

export default axiosInstance