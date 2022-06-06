import { reqAddressInfo, reqOrderInfo } from "@/api";

const state = {
  address: [],
  orderInfo: {}
};
const mutations = {
  GET_USERADDRESS(state, address) {
    state.address = address;
  },
  GET_ORDERINFO(state,orderInfo) {
    state.orderInfo = orderInfo
  }
};
const actions = {
  async getUserAddress({ commit }) {
    let result = await reqAddressInfo();
    if (result.code === 200) {
      commit("GET_USERADDRESS", result.data);
    } else {
      return Promise.reject();
    }
  },

  async getOrderInfo({ commit }) {
    let result = await reqOrderInfo();
    if (result.code === 200) {
      commit('GET_ORDERINFO',result.data)
    } else {
      return Promise.reject();
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
