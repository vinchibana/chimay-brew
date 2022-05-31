import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/pages/Home/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

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
      path: "/search",
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
      path: "/",
      redirect: "/home",
    },
  ],
});
