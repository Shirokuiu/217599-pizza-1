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

  methods: {
    ...mapActions("Auth", ["getMe", "toggleIsAuth"]),
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
