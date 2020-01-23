<template>
  <v-app>
    <AppNav></AppNav>
    <AppDrawer></AppDrawer>
    <v-content
      id="content-top"
      aria-live="polite"
      style="background: #fafafa; min-height: 68vh"
    >
      <OutdatedBrowser v-if="$browserDetect.isIE"></OutdatedBrowser>
      <transition name="fade" mode="out-in">
        <div v-if="$root.loading" style="margin-top: 100px">LOADING</div>
        <router-view v-else></router-view>
      </transition>
    </v-content>
    <AppFooter v-if="!$browserDetect.isIE"></AppFooter>
  </v-app>
</template>

<script>
// import AppNav from "@/components/AppNav";
// import AppDrawer from "@/components/AppDrawer";
// import AppFooter from "@/components/AppFooter";
// import OutdatedBrowser from "@/components/OutdatedBrowser";
export default {
  name: "App",
  metaInfo() {
    return {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: "frontmatter-markdown-loader Test",
      // all titles will be injected into this template
      titleTemplate: "%s",
      htmlAttrs: {
        lang: "en"
      },
      link: [{ rel: "canonical", href: this.canonical }],
      meta: [
        { charset: "utf-8" },
        {
          vmid: "robots",
          name: "robots",
          content: "index, follow"
        },
        {
          vmid: "description",
          name: "description",
          content: "frontmatter-markdown-loader Test "
        }
      ]
    };
  },

  components: {
    // AppNav,
    // AppDrawer,
    // AppFooter,
    // OutdatedBrowser
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      this.canonical = "https://icjia.illinois.gov/r3" + this.$route.path;
      console.log(this.canonical);
    }
  },

  data: () => ({
    loading: true,
    pages: [],
    canonical: ""
  }),
  async created() {
    this.loading = true;
    this.canonical = "https://icjia.illinois.gov/r3" + this.$route.path;
    //console.log(this.canonical);
    if (!this.$store.state.isAppReady) {
      const configPromise = process.BROWSER_BUILD
        ? import("@/config.json")
        : Promise.resolve(require("@/config.json"));
      let config = await configPromise;
      this.$store.dispatch("setConfig", config);
      this.$store.dispatch("initApp");
      this.loading = false;
    }
    console.log(this.$root.loading);
  }
};
</script>
