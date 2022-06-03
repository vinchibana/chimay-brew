import { reqCartList } from "@/api";

const state = {
  shopCartInfo: [],

};
const mutations = {
  GET_SHOPCART(state, cartList) {
    console.log(cartList)
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
