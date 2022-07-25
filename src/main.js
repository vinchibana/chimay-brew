import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import TypeNav from "@/pages/Home/TypeNav";
import store from "@/store";
import "@/mock/mockServe";
import "swiper/css/swiper.min.css";
import Carousel from "@/components/Carousel";
import * as API from "@/api";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Pagination from "@/components/Pagination";

Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
  beforeCreate() {
    // 为原型添加事件总线、API
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
}).$mount("#app");
