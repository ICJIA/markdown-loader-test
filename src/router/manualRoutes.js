const manualRoutes = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "static" */ "../views/Home.vue"),
    meta: {
      path: "public/markdown/home.md",
      title: "AREAS ELIGIBLE FOR R3 PROGRAM GRANTS",
      tocHeading: "Eligible Areas",
      tocComponent: "Toc",
      createdAt: "2020-01-23",
      updatedAt: "2020-01-23"
    }
  },
  {
    path: "/test/one",
    name: "test",
    meta: {
      path: "public/markdown/test-three.md",
      title: "Static Page",
      tocComponent: "Toc",
      createdAt: "2020-01-23",
      updatedAt: "2020-01-23",
      tocHeading: "Static Page"
    },
    component: () =>
      import(/* webpackChunkName: "static" */ "../views/Static.vue")
  },
  {
    path: "/404",
    name: "404",

    component: () => import(/* webpackChunkName: "404" */ "../views/404.vue")
  },

  { path: "/home", redirect: "home" }
];

export { manualRoutes };
