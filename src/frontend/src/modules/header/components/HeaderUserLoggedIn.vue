<template>
  <div class="header__user">
    <HeaderUserInfo />
    <a style="cursor: pointer" class="header__logout" @click="logout">
      <span>Выйти</span>
    </a>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import HeaderUserInfo from "src/modules/header/components/HeaderUserInfo";

export default {
  name: "HeaderUserLoggedIn",

  components: {
    HeaderUserInfo,
  },

  methods: {
    ...mapActions("Auth", ["logout"]),
  },
};
</script>
