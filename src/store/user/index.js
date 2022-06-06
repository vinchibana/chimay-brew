import {
  reqGetVerifyCode,
  reqUserInfo,
  reqUserLogin,
  reqUserLogout,
  reqUserRegister,
} from "@/api";
import { setToken, getToken, removeToken } from "@/utils/token";

const state = {
  verifyCode: "",
  token: getToken(),
  userInfo: {},
};
const mutations = {
  GET_VERIFY_CODE(state, verifyCode) {
    state.verifyCode = verifyCode;
  },
  USER_LOGIN(state, token) {
    state.token = token;
  },
  GET_USERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },

  USER_LOGOUT(state) {
    state.token = "";
    state.userInfo = {};
    removeToken();
  },
};
const actions = {
  async getVerifyCode({ commit }, phone) {
    let result = await reqGetVerifyCode(phone);
    if (result.code === 200) {
      commit("GET_VERIFY_CODE", result.data);
    } else {
      return Promise.reject();
    }
  },

  async userRegister({ commit, state, dispatch }, userData) {
    let result = await reqUserRegister(userData);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },

  async userLogin({ commit, state, dispatch }, loginData) {
    let result = await reqUserLogin(loginData);
    if (result.code === 200) {
      commit("USER_LOGIN", result.data.token);
      setToken(result.data.token);
    } else {
      return Promise.reject(new Error("failed"));
    }
  },

  async getUserInfo({ commit }) {
    let result = await reqUserInfo();
    if (result.code === 200) {
      commit("GET_USERINFO", result.data);
    } else {
      return Promise.reject();
    }
  },

  async userLogout({ commit }) {
    let result = await reqUserLogout();
    if (result.code === 200) {
      commit("USER_LOGOUT");
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
