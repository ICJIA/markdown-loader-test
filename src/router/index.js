import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const manualRoutes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/sandbox",
    name: "sandbox",

    component: () =>
      import(/* webpackChunkName: "sandbox" */ "../views/Sandbox.vue")
  }
];

const generatedRoutes = [
  {
    path: "/test-one",
    name: "test-one",

    component: () =>
      import(/* webpackChunkName: "test-one" */ "../views/Page.vue")
  },
  {
    path: "/test-two",
    name: "test-two",

    component: () =>
      import(/* webpackChunkName: "test-two" */ "../views/Page.vue")
  },
  {
    path: "/folder-one/test-three",
    name: "folder-one-test-three",

    component: () =>
      import(/* webpackChunkName: "test-three" */ "../views/Page.vue")
  }
];

const fallBackRoutes = [
  {
    path: "/404",
    name: "404",

    component: () => import(/* webpackChunkName: "404" */ "../views/404.vue")
  },

  { path: "*", redirect: "/404" }
];

const routes = [...manualRoutes, ...generatedRoutes, ...fallBackRoutes];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
