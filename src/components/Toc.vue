<template>
  <div
    class="toc"
    :class="{
      'pl-2': $vuetify.breakpoint.xs || $vuetify.breakpoint.xs,
      'pl-10':
        $vuetify.breakpoint.md ||
        $vuetify.breakpoint.lg ||
        $vuetify.breakpoint.xl,
      shaded: $vuetify.breakpoint.xs || $vuetify.breakpoint.xs
    }"
    style=""
  >
    <div
      v-if="tocHeading.length"
      ref="anchor"
      style="margin-left: -3px; font-weight: bold;"
      class="mb-4 hover anchor"
      @click="$vuetify.goTo(0)"
    >
      {{ tocHeading }}
    </div>
    <div class="divider">
      <ul class="toc-list">
        <li
          v-for="(item, index) in items"
          :key="index"
          @click="scrollTo(item.id)"
        >
          <span :id="`scrollTo-${item.id}`" class="tocItem">{{
            item.text
          }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    tocHeading: {
      type: String,
      default: "NAVIGATION"
    },
    top: {
      type: String,
      default: "#baseContentTop"
    },
    enableTracking: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    if (this.enableTracking) {
      window.onscroll = () => {
        var scrollPosition =
          document.documentElement.scrollTop || document.body.scrollTop;
        const tocItems = document.querySelectorAll(".tocItem");
        if (scrollPosition < 100) {
          tocItems.forEach(toc => {
            toc.classList.remove("visible");
          });
          this.$refs["anchor"].classList.add("visible");
        } else {
          this.$refs["anchor"].classList.remove("visible");
        }
        //console.log(scrollPosition);
        // for (i in sections) {
        //   if (sections[i] <= scrollPosition) {
        //     const sectionItem = document.getElementById(`scrollTo-${i}`);
        //     tocItems.forEach(toc => {
        //       toc.classList.remove("visible");
        //     });
        //     sectionItem.classList.add("visible");
        //   }
        // }
      };
    }
  },
  methods: {
    scrollTo(id) {
      //console.log(id);
      this.$vuetify.goTo(`#${id}`, { offset: 15 });
    }
  }
};
</script>

<style>
.divider {
  border-left: 1px solid #ccc;
}
.visible {
  color: #116bb9 !important;
  font-weight: bold;
}
.anchor {
  padding: 2px 5px 2px 5px;
}
.anchor:hover {
  color: #116bb9;
  background: #eee;
}
.shaded {
  background: #eee;
  padding: 15px;
  margin-bottom: 25px;
}
.toc {
  position: -webkit-sticky !important; /* Safari */
  position: sticky !important;
  top: 125px !important;
}
ul.toc-list {
  list-style-type: none;
}
ul.toc-list li {
  color: #333;
  padding: 2px 5px 2px 5px;
  cursor: pointer;
  margin-bottom: 8px;
  font-size: 14px;
}
ul.toc-list li:hover {
  color: #116bb9;
  background: #eee;
}
@media only screen and (max-width: 960px) {
  .divider {
    border-left: 0px solid #ccc;
  }
  ul.toc-list li:hover {
    color: #fff;
    background: #aaa;
  }
}
</style>
