<template>
  <div>
    <base-content id="baseContentTop" class="mb-12" :loading="loading">
      <template v-slot:title>
        <v-container>
          <v-row class="text-left">
            <v-col cols="12">
              <h1 class="page-title" :id="slugify(title)">
                {{ $route.meta.title }}
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
              <HomePageContent
                @hook:mounted="initToc"
                @click.native="handleClicks"
                class="dynamic-content"
              ></HomePageContent>
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
              <component
                :is="$route.meta.tocComponent"
                selector="#scrollArea"
                top="#baseContentTop"
                key="home"
                :tocHeading="$route.meta.tocHeading"
                :items="toc"
              />
            </v-col>
          </v-row>
        </v-container>
      </template>
    </base-content>
  </div>
</template>

<script>
import { handleClicks } from "@/mixins/handleClicks";
const slugs = require("slugs");
import fm from "../../public/markdown/home.md";

export default {
  mixins: [handleClicks],
  metaInfo() {
    return {
      title: "Lorem markdownum Diomede"
    };
  },
  mounted() {
    // this.$ga.page({
    //   page: this.$route.path,
    //   title: "Restore, Reinvest, and Renew (R3)",
    //   location: window.location.href
    // });
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
      showToc: fm.attributes.showToc,
      loading: false,
      toc: [],
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
    test() {
      console.log("click");
    },
    initToc() {
      const sections = Array.from(document.querySelectorAll("h2"));
      sections.forEach(section => {
        let obj = {};
        obj.text = section.innerText;
        obj.id = section.id;
        this.toc.push(obj);
      });
      //console.log(this.toc);
    },
    slugify(str) {
      return slugs(str);
    }
  }
};
</script>
