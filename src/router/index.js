import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/pages/Home/Home";
import Search from "@/pages/Search/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      name: "home",
      path: "/home",
      component: Home,
      meta: { show: true },
    },
    {
      name: "search",
      path: "/search/:keyword?", // params 传参占位
      component: Search,
      meta: { show: true },
    },
    {
      path: "/login",
      component: Login,
      meta: { show: false },
    },
    {
      path: "/register",
      component: Register,
      meta: { show: false },
    },
    {
      name: "detail",
      path: "/detail/:skuid",
      component: Detail,
      meta: { show: false },
    },
    {
      name: "addcartsuccess",
      path: "/addcartsuccess",
      component: AddCartSuccess,
      meta: { show: true },
    },
    {
      name: "shopcart",
      path: "/shopcart",
      component: ShopCart,
      meta: { show: true },
    },
    {
      path: "/",
      redirect: "/home",
    },
  ],
  scrollBehavior() {
    return { y: 0 };
  },
});
