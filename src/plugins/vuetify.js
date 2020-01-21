import Vue from "vue";
import Vuetify from "vuetify/lib";
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify);

var opts = {
  icons: {},
  theme: {
    themes: {
      light: {
        primary: "#0D4574",
        secondary: "#067879",
        accent: "#3f51b5",
        error: "#e91e63",
        warning: "#ffc107",
        info: "#03a9f4",
        success: "#4caf50"
      }
    }
  }
};

export default new Vuetify(opts);
