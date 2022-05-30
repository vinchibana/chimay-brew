import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

const requests = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

// 添加请求拦截器
requests.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    nprogress.start();
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
requests.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    nprogress.done();
    return response.data;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default requests;
