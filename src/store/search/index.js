import { reqSearchList } from "@/api";

const state = {
  searchList: {},
};
const mutations = {
  GET_SEARCHLIST(state, searchList) {
    state.searchList = searchList;
  },
};
const actions = {
  async getSearchList({ commit }, params = {}) {
    let result = await reqSearchList(params);
    if (result.code === 200) {
      commit("GET_SEARCHLIST", result.data);
    }
  },
};

const getters = {
  goodsList(state) {
    return state.searchList.goodsList || [];
  },
  attrsList(state) {
    return state.searchList.attrsList;
  },
  trademarkList(state) {
    return state.searchList.trademarkList;
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
