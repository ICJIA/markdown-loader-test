/* eslint-disable no-console */
import Vue from "vue";
import Vuex from "vuex";
const config = require("@/config.json");
// const LS_ROUTE_KEY = process.env.VUE_APP_LS_ROUTE_KEY;
// console.log("LS_ROUTE_KEY", LS_ROUTE_KEY);

Vue.use(Vuex);

// function buildStatusUrl() {
//   let url;
//   let endpoint = ".netlify/functions/status";
//   if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
//     url = `http://localhost:9000/${endpoint}`;
//   } else {
//     url = `${config.clientURL}${config.publicPath}${endpoint}`;
//   }

//   return url;
// }

// async function fetchData(endpoint) {

//   let data;
//   let response = await fetch(endpoint);
//   return (data = await response.json());
// }

export default new Vuex.Store({
  state: {
    isAppReady: false,
    config: null,
    routes: null,
    sections: null,
    searchIndex: null,
    lastDeploy: null,
    lastBuild: null,
    apiStatus: null,
    cache: new Map(),

    jwt: localStorage.getItem("jwt") || "",
    userMeta: JSON.parse(localStorage.getItem("userMeta")) || ""
  },
  mutations: {
    CLEAR_CACHE(state) {
      state.cache.clear();
      console.log("Cache cleared");
    },
    CLEAR_LOCAL_STORAGE(state) {
      // localStorage.removeItem(LS_ROUTE_KEY);
      if (state.config.debug) {
        console.log("Local storage cleared");
      }
    },
    SET_APP_READY(state, bool) {
      state.isAppReady = bool;
      console.log("isAppReady", bool);
    },
    SET_CONFIG(state, config) {
      state.config = config;
      console.log("Config loaded");
    },
    SET_ROUTES(state, routes) {
      state.routes = routes;
      console.log("Routes loaded");
    },
    SET_SEARCH_INDEX(state, searchIndex) {
      state.searchIndex = searchIndex;
      console.log("Search index loaded");
    },
    SET_CACHE(state, { hash, query }) {
      state.cache.set(hash, query);
      //console.log(hash, ": cached");
    },
    SET_SECTIONS(state, sections) {
      state.sections = sections;
      console.log("Sections loaded");
    },
    SET_API_STATUS(state, apiStatus) {
      state.apiStatus = apiStatus;
      console.log("API status code: ", apiStatus);
    }
  },
  actions: {
    async initApp({ commit }) {
      commit("CLEAR_CACHE");
      commit("CLEAR_LOCAL_STORAGE");
      commit("SET_APP_READY", true);
    },
    async setApiStatus({ commit }) {
      commit("SET_API_STATUS", 200);
      console.log("status server bypassed");
    },
    setConfig({ commit }, config) {
      commit("SET_CONFIG", config);
    },
    setRoutes({ commit }, routes) {
      commit("SET_ROUTES", routes);
    },
    setSearchIndex({ commit }, searchIndex) {
      commit("SET_SEARCH_INDEX", searchIndex);
    },
    setSections({ commit }, sections) {
      commit("SET_SECTIONS", sections);
    }
  },
  getters: {
    isApiReady: state => {
      if (state.apiStatus === 200 || state.apiStatus === 204) {
        return true;
      } else {
        return false;
      }
    },
    config: state => {
      return state.config;
    },

    debug: state => {
      return state.config.debug;
    }
  }
});
