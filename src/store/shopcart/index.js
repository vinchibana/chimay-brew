import { reqCartList, reqDeleteCartById, reqUpdateStatus } from "@/api";

const state = {
  shopCartInfo: [],
};
const mutations = {
  GET_SHOPCART(state, cartList) {
    state.shopCartInfo = cartList;
  },
};

const actions = {
  async getShopCart({ commit }) {
    let result = await reqCartList();
    if (result.code === 200) {
      commit("GET_SHOPCART", result.data);
    }
  },
  async deleteCartItemById({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
  async updateStatus({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateStatus(skuId, isChecked);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },

  // 从 context 中解构 getters,dispatch,state,commit...
  deleteAllChecked({ getters, dispatch }) {
    let arr = [];
    getters.cartInfo.cartInfoList.forEach((cartItem) => {
      if (cartItem.isChecked === 1) {
        let result = dispatch("deleteCartItemById", cartItem.skuId);
        arr.push(result);
      }
      return Promise.all(arr);
    });
  },
};

const getters = {
  cartInfo(state) {
    return state.shopCartInfo[0] || [];
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
