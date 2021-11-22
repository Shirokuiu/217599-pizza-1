<template>
  <div class="app__wrap">
    <TheHeader />
    <router-view></router-view>
  </div>
</template>

<script>
import TheHeader from "@/modules/header/components/TheHeader";
import { mapActions } from "vuex";

export default {
  name: "App",

  components: {
    TheHeader,
  },

  created() {
    this.init();
  },

  methods: {
    ...mapActions("Auth", ["checkIsAuth"]),
    ...mapActions("Builder", ["init"]),
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";

// NOTE: Иначе едет верстка в корзине
.app__wrap {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
</style>
