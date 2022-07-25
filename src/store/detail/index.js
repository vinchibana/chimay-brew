import { reqSkuInfo, reqUpdateCart } from "@/api";
import { getUUID } from "@/utils/uuid_token";

const state = {
  goodInfo: {},
  uuid_token: getUUID(),
};
const mutations = {
  GET_GOOD_INFO(state, skuInfo) {
    state.goodInfo = skuInfo;
  },
};
const actions = {
  async getGoodInfo({ commit }, skuId) {
    let result = await reqSkuInfo(skuId);
    if (result.code === 200) {
      commit("GET_GOOD_INFO", result.data);
    }
  },

  async updateCart({ commit }, { skuId, skuNum }) {
    let result = await reqUpdateCart(skuId, skuNum);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject();
    }
  },
};
const getters = {
  categoryView(state) {
    return state.goodInfo.categoryView || {};
  },
  skuInfo(state) {
    return state.goodInfo.skuInfo || {};
  },
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || {};
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
