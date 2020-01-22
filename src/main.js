import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@/filters";
import "@/assets/css/github-markdown.css";
import "@/assets/css/app.css";
import "@/components/_globals";

(function() {
  if (typeof NodeList.prototype.forEach === "function") return false;
  NodeList.prototype.forEach = Array.prototype.forEach;
})();

(function() {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
  }
})();

import browserDetect from "vue-browser-detect-plugin";
Vue.use(browserDetect);

import VueMeta from "vue-meta";
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
});

// import VueAnalytics from "vue-analytics";
// Vue.use(VueAnalytics, {
//   id: "UA-150082887-6",
//   debug: {
//     sendHitTask: process.env.NODE_ENV === "production"
//   }
// });

import VueRouterBackButton from "vue-router-back-button";
Vue.use(VueRouterBackButton, { router });

NProgress.configure({ showSpinner: false });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
