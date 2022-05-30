import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import TypeNav from "@/pages/Home/TypeNav";
import {reqCategoryList} from "@/api";
import store from "@/store";

Vue.component(TypeNav.name,TypeNav)
Vue.config.productionTip = false
reqCategoryList()

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
