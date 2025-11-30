import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000'
});


// intercept response
api.interceptors.request.use(
    (config) =>{
        // Get saved token and reformat
        const token = localStorage.getItem('token');

        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }

        // return reformatted config
        return config;
    },
    (error) =>{
        return Promise.reject(error);
    }
);

export default api;