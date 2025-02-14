import Axios from 'axios';

// 读取环境变量
const AI_API_BASE = import.meta.env.VITE_AI_API_BASE;
const BACKEND_API_BASE = import.meta.env.VITE_BACKEND_API_BASE;
const token = import.meta.env.VITE_TOKEN_SECRET;

// 创建 AI API 请求实例
const aiAxios = Axios.create({
  baseURL: AI_API_BASE,
  timeout: 20000,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

// 创建后端 API 请求实例
const backendAxios = Axios.create({
  baseURL: BACKEND_API_BASE,
  timeout: 20000,
  headers: {
    // TODO: 应该使用登陆后的jwt token
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

// 统一拦截器（可根据需要分别定义）
const setupInterceptors = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      config.headers['accept-language'] = 'en_US';
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
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
};

// 应用拦截器
setupInterceptors(aiAxios);
setupInterceptors(backendAxios);

export { aiAxios, backendAxios };