import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL ?? 'http://localhost:7001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// attach token to every request automatically
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// handle 401 globally — clear token and redirect to login
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default client;