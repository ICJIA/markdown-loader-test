<template>
  <v-container
    class="text-center"
    fill-height
    style="height: calc(100vh - 148px);"
  >
    <v-row align="center">
      <v-col>
        <h1 class="display-2 primary--text">404</h1>

        <p>The page you were looking for does not exist</p>

        <v-btn :to="`/`" color="primary" outlined>
          Go Home
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "FourOhFour",

  props: {
    lang: {
      type: String,
      default: "en"
    }
  },

  created() {}
};
</script>
