<template>
  <div>
    <base-content id="baseContentTop" class="mb-12" :loading="loading">
      <template v-slot:title>
        <v-container>
          <v-row class="text-left">
            <v-col cols="12">
              <h1 class="page-title" :id="slugify(title)">
                {{ title }}
              </h1>
            </v-col>
          </v-row>
        </v-container>
      </template>
      <template v-slot:content>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="12"
              :md="dynamicFlex()"
              order-md="1"
              order="2"
              order-sm="2"
              class="markdown-body"
            >
              <HomePageContent></HomePageContent>
            </v-col>
            <v-col
              v-if="showToc"
              cols="12"
              sm="12"
              md="3"
              order-md="2"
              order="1"
              order-sm="1"
            >
              <toc
                selector="#scrollArea"
                top="#baseContentTop"
                :enable-tracking="true"
                key="home"
                :tocHeading="fm.attributes.navTitle"
              />
            </v-col>
          </v-row>
        </v-container>
      </template>
    </base-content>
  </div>
</template>

<script>
const slugs = require("slugs");
import fm from "@/markdown/home.md";

export default {
  metaInfo() {
    return {
      title: "Restore, Reinvest, and Renew (R3)"
    };
  },
  mounted() {
    this.$ga.page({
      page: this.$route.path,
      title: "Restore, Reinvest, and Renew (R3)",
      location: window.location.href
    });
    //console.log(this.$route.path, window.location.href);
  },
  components: {
    HomePageContent: {
      extends: fm.vue.component,
      components: {}
    }
  },
  data() {
    return {
      title: fm.attributes.title,
      showToc: true,
      loading: false,
      fm
    };
  },
  methods: {
    dynamicFlex() {
      if (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) {
        return "12";
      } else {
        return this.showToc ? "9" : "12";
      }
    },
    slugify(str) {
      return slugs(str);
    }
  }
};
</script>
