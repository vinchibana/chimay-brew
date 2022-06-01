import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import TypeNav from "@/pages/Home/TypeNav";
import store from "@/store";
import "@/mock/mockServe";
import "swiper/css/swiper.min.css";
import Carousel from "@/components/Carousel";

Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.config.productionTip = false;
new Vue({
  render: (h) => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this;
  }
}).$mount("#app");
