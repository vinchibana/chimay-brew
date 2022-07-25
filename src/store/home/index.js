import { reqBannerList, reqCategoryList, reqFloorList } from "@/api";

const state = {
  categoryList: [],
  bannerList: [],
  floorList: [],
};
const mutations = {
  // 接收响应中的数据数组（response.data.data），并作为 payload （categoryList）传递给 state
  GET_CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  GET_BANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  GET_FLOORLIST(state, floorList) {
    state.floorList = floorList;
  },
};
const actions = {
  async categoryList({ commit }) {
    let result = await reqCategoryList();
    if (result.code === 200) {
      // result.data 作为 commit 的 payload，下同
      commit("GET_CATEGORYLIST", result.data);
    }
  },
  async getBannerList({ commit }) {
    let result = await reqBannerList();
    if (result.code === 200) {
      commit("GET_BANNERLIST", result.data);
    }
  },

  async getFloorList({ commit }) {
    let result = await reqFloorList();
    if (result.code === 200) {
      commit("GET_FLOORLIST", result.data);
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
