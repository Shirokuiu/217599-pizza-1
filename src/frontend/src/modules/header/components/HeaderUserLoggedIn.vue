<template>
  <a style="cursor: pointer" class="header__logout" @click="logout">
    <span>Выйти</span>
  </a>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "HeaderUserLoggedIn",

  methods: {
    ...mapActions("Auth", ["logout"]),
  },
};
</script>
