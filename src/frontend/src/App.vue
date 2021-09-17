<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",

  computed: {
    layout() {
      return () => import("./layouts/AppLayout.vue");
    },
  },

  created() {
    this.getDoughs();
    this.getSizes();
    this.getSauces();
    this.getIngredients();
  },

  methods: {
    ...mapActions("Auth", ["getMe", "toggleIsAuth"]),
    ...mapActions("Builder", [
      "getDoughs",
      "getSizes",
      "getSauces",
      "getIngredients",
    ]),
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
