<template>
  <div>
    <HeaderUserNoLogin v-if="!isAuth" />
    <HeaderUserLoggedIn v-if="isAuth" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import HeaderUserNoLogin from "src/modules/header/components/HeaderUserNoLogin";
import HeaderUserLoggedIn from "src/modules/header/components/HeaderUserLoggedIn";

export default {
  name: "HeaderUser",

  components: {
    HeaderUserNoLogin,
    HeaderUserLoggedIn,
  },

  computed: {
    ...mapState("Auth", ["isAuth"]),
  },
};
</script>
