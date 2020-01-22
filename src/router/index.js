import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
const markdownRoutes = require("../../public/routes.json");

const generatedRoutes = markdownRoutes.map(route => {
  route.component = () =>
    import(/* webpackChunkName: "404" */ "@/views/Page.vue");
  return route;
});

Vue.use(VueRouter);

const manualRoutes = [
  {
    path: "/",
    name: "home",
    component: Home
  }
];

const fallBackRoutes = [
  {
    path: "/404",
    name: "404",

    component: () => import(/* webpackChunkName: "404" */ "@/views/404.vue")
  },

  { path: "/home", redirect: "home" },

  { path: "*", redirect: "/404" }
];

const routes = [...manualRoutes, ...generatedRoutes, ...fallBackRoutes];
console.dir(routes);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

export default router;
