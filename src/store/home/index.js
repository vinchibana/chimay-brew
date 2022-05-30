import { reqCategoryList } from "@/api";

const state = {
  categoryList: [],
};
const mutations = {
  // 接收响应中的数据数组（response.data.data），并作为 payload （categoryList）传递给 state
  CATEGORY_LIST(state, categoryList) {
    state.categoryList = categoryList;
  },
};
const actions = {
  async categoryList({ commit }) {
    let result = await reqCategoryList();
    if (result.code === 200) {
      commit("CATEGORY_LIST", result.data);
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
