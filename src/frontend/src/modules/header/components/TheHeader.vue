<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/" class="logo">
        <img
          src="~@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link to="/cart">{{ totalPrice }} ₽</router-link>
    </div>
    <HeaderLogin v-if="!isAuth" />
    <HeaderLogout v-if="isAuth" />
  </header>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import HeaderLogin from "@/modules/header/components/HeaderLogin";
import HeaderLogout from "@/modules/header/components/HeaderLogout";

export default {
  name: "TheHeader",

  components: {
    HeaderLogin,
    HeaderLogout,
  },

  computed: {
    ...mapGetters("Cart", ["totalPrice"]),
    ...mapState("Auth", ["isAuth"]),
  },
};
</script>
