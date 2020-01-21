<template>
  <div>
    <component :is="markdownContent" />
  </div>
</template>

<script>
import Toc from "@/components/Toc";
const slugs = require("slugs");
import error from "@/markdown/error.md";
export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Toc
  },
  data() {
    return {
      markdownContent: null
    };
  },
  created() {
    this.markdownContent = () =>
      import(`@/markdown/${this.$route.params.slug}.md`)
        .then(fmd => {
          this.title = fmd.attributes.title;
          return {
            extends: fmd.vue.component,
            components: {}
          };
        })
        .catch(err => {
          console.log(err);
          this.$router.push("/404");
        });
  },
  mounted() {
    // let x = document.getElementsByTagName("h2");
    // console.log(x);
  },

  data() {
    return {
      title: null,
      showToc: true,
      loading: false
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

<style lang="scss" scoped></style>
