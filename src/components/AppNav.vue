<template>
  <v-app-bar app color="white" fixed height="90" class="noprint">
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2 hover"
        contain
        :src="require('@/assets/img/icjia-logo-blue.png')"
        transition="scale-transition"
        :width="logoWidth()"
        @click="
          $router.push('/').catch(err => {
            $vuetify.goTo(0);
          })
        "
      />
    </div>

    <div
      class="nav-title ml-4 hover"
      :class="{ small: $vuetify.breakpoint.xs || $vuetify.breakpoint.sm }"
      @click="
        $router.push('/').catch(err => {
          $vuetify.goTo(0);
        })
      "
    >
      Restore, Reinvest, and Renew (R3)
    </div>

    <v-spacer></v-spacer>

    <v-btn
      href="https://icjia.illinois.gov"
      target="_blank"
      text
      class="hidden-sm-and-down"
    >
      <span class="mr-2">ICJIA</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
    <!-- <v-app-bar-nav-icon
      aria-label="Menu"
      style="color: black"
      large
      @click="toggleDrawer"
    /> -->
    <!-- <v-btn small href="https://github.com/ICJIA/icjia-r3" target="_blank" text>
      <span class="mr-2">Github</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn> -->
  </v-app-bar>
</template>

<script>
import { EventBus } from "@/event-bus";
export default {
  methods: {
    toggleDrawer() {
      EventBus.$emit("toggleDrawer");
    },
    logoWidth() {
      //console.log(this.$vuetify.breakpoint);
      if (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) {
        return 70;
      } else {
        return 70;
      }
    }
  }
};
</script>

<style>
.nav-title {
  font-weight: 900;
  font-size: 24px;
}
.nav-title.small {
  font-size: 15px;
}
</style>
