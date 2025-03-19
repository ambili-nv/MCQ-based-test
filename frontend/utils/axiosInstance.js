import axios from 'axios';
import { BASE_URL } from './constants';


const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor to attach the token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; 
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;