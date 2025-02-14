import Axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_API;

const axios = Axios.create({
  baseURL,
  timeout: 20000, // 超时时间 20s
  headers: {
    // jwt token
    // Authorization: `Bearer token`,
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      console.error(error.response.data.message);
    } else {
      console.error(error);
    }
    return Promise.reject(error);
  }
);

export { axios };