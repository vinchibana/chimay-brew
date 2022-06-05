import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter);
import routes from "./routes";
import store from "@/store";
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return { y: 0 };
  },
});

export default router;

router.beforeEach((to, from, next) => {
  next();
  let token = store.state.user.token;
  if (token) {
    if (to.path === "/login") {
      next("/");
    }
  }
});
