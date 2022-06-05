import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";

export default [
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
    name: "trade",
    path: "/trade",
    component: Trade,
  },
  {
    path: "/",
    redirect: "/home",
  },
];
