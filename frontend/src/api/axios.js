import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5001',
    withCredentials: true
});


// intercept response
api.interceptors.request.use(
    (config) =>{
        if (!config.url.includes('/login') && !config.url.includes('/signup')) {
            const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    // return reformatted config
    return config;
    },
    (error) =>{
        return Promise.reject(error);
    }
);

export default api;