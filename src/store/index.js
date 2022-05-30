import Vue from "vue";
import Vuex from "vuex";
import home from "@/store/home";
import search from "@/pages/Search";

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    home,
    search,
  },
});
