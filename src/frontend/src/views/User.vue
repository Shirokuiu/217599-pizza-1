<template>
  <main class="layout">
    <AppSidebar>
      <router-link
        to="/user/orders"
        active-class="layout__link--active"
        class="layout__link"
        >История заказов</router-link
      >
      <router-link
        to="/user/profile"
        active-class="layout__link--active"
        class="layout__link"
        >Мои данные</router-link
      >
    </AppSidebar>

    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>
  </main>
</template>

<script>
import AppSidebar from "@/common/components/AppSidebar";
import Profile from "@/modules/profile/store/profile/profile.store";
import Orders from "@/modules/orders/store/orders/orders.store";

export default {
  name: "User",

  components: {
    AppSidebar,
  },

  beforeCreate() {
    this.$store.registerModule("Profile", Profile);
    this.$store.registerModule("Orders", Orders);
  },

  beforeDestroy() {
    this.$store.unregisterModule("Profile");
    this.$store.unregisterModule("Orders");
  },
};
</script>
