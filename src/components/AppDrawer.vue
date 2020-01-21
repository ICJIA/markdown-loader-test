<template>
  <v-navigation-drawer app temporary v-model="drawer">
    test
  </v-navigation-drawer>
</template>

<script>
import { EventBus } from "@/event-bus";
export default {
  data() {
    return {
      drawer: false
    };
  },
  mounted() {
    EventBus.$on("toggleDrawer", () => {
      this.drawer = !this.drawer;
    });
  }
};
</script>
