<template>
  <div>
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
                  <component
                    :is="markdownContent"
                    @hook:mounted="initToc"
                    @click.native="handleClicks"
                    class="dynamic-content"
                  />
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
                    :items="toc"
                  />
                </v-col>
              </v-row>
            </v-container>
          </template>
        </base-content>
      </div>
    </template>
  </div>
</template>

<script>
import { handleClicks } from "@/mixins/handleClicks";

const slugs = require("slugs");
export default {
  mixins: [handleClicks],
  watch: {
    $route: "fetchContent"
  },
  data() {
    return {
      attributes: {},
      selectedArticle: null,
      title: "",
      markdownContent: null,
      toc: [],
      showToc: true,
      sections: []
    };
  },
  created() {
    this.loading = true;
    this.fetchContent();
    this.loading = false;
  },
  methods: {
    fetchContent() {
      NProgress.start();
      this.markdownContent = async () =>
        await import(`../../public/markdown${this.$route.path}.md`)
          .then(fmd => {
            this.title = fmd.attributes.title;
            this.showToc = fmd.attributes.showToc;

            NProgress.done();
            return {
              extends: fmd.vue.component
            };
          })
          .catch(err => {});
    },
    slugify(str) {
      return slugs(str);
    },

    dynamicFlex() {
      if (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) {
        return "12";
      } else {
        return this.showToc ? "9" : "12";
      }
    },
    initToc() {
      if (this.$route.meta.tocComponent === "Toc") {
        let sections = Array.from(document.querySelectorAll("h2"));

        sections.forEach(section => {
          let obj = {};
          obj.text = section.innerText;
          obj.id = section.id;
          this.toc.push(obj);
          this.sections.push(`h2#${section.id}`);
        });
      }
      if (this.$route.meta.tocComponent === "TocDetails") {
        let sections = document.querySelectorAll("details");
        sections.forEach(section => {
          section.id = slugs(section.innerText);
          let obj = {};
          obj.text = section.innerText;
          obj.id = section.id;
          this.toc.push(obj);
        });
      }
    }
  },
  mounted() {}
};
</script>
