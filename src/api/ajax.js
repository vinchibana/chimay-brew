import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store";

// 创建 axios 实例
const requests = axios.create({
  baseURL: "/api",
  timeout: 5000,
  headers: { user: "foobar" },
});

// 添加请求拦截器
requests.interceptors.request.use(
  // 传入 config 进行处理并返回 config
  (config) => {
    // 显示进度条
    nprogress.start();
    // 为请求头添加用户临时 id
    if (store.state.detail.uuid_token) {
      config.headers.userTempId = store.state.detail.uuid_token;
    }
    // 获取 token 后改为请求头添加用户 token
    if (store.state.user.token) {
      config.headers.token = store.state.user.token;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
requests.interceptors.response.use(
  function (response) {
    // 结束进度条并返回 response.data
    nprogress.done();
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default requests;
