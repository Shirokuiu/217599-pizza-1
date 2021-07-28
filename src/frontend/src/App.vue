<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import JWTService from "src/services/JWTService";
import { mapActions } from "vuex";

export default {
  name: "App",

  computed: {
    layout() {
      return () => import("./layouts/AppLayout.vue");
    },
  },

  created() {
    if (JWTService.getToken()) {
      this.$api.auth.setAuthHeader();
      this.toggleIsAuth(true);
      this.getMe();
    }
  },

  methods: {
    ...mapActions("Auth", ["getMe", "toggleIsAuth"]),
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
