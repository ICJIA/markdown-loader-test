import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

// const LS_ROUTE_KEY = process.env.VUE_APP_LS_ROUTE_KEY;

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/404",
    name: "404",

    component: () => import(/* webpackChunkName: "404" */ "../views/404.vue")
  },

  {
    path: "/sandbox/:slug",
    name: "sandbox",

    component: () =>
      import(/* webpackChunkName: "sandbox" */ "../views/Sandbox.vue")
  },
  { path: "*", redirect: "/" }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// router.afterEach((to, from) => {
//   try {
//     localStorage.setItem(LS_ROUTE_KEY, from.path);
//   } catch (e) {
//     console.log(e);
//   }
// });

export default router;
