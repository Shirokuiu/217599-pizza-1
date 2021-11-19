<template>
  <div class="header__user">
    <router-link v-if="user" to="/user/profile">
      <picture>
        <source
          type="image/webp"
          srcset="
            ~@/assets/img/users/user5.webp    1x,
            ~@/assets/img/users/user5@2x.webp 2x
          "
        />
        <img
          src="~@/assets/img/users/user5.jpg"
          srcset="~@/assets/img/users/user5@2x.jpg"
          alt="Василий Ложкин"
          width="32"
          height="32"
        />
      </picture>
      <span>{{ user.name }}</span>
    </router-link>
    <a @click.prevent="onLogout" class="header__logout"><span>Выйти</span></a>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "HeaderLogout",

  computed: {
    ...mapState("Auth", ["user"]),
  },

  methods: {
    ...mapActions("Auth", ["logout"]),
    ...mapActions("Cart", ["resetState"]),

    async onLogout() {
      try {
        await this.logout();

        this.resetState();
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style lang="scss">
.header__logout {
  cursor: pointer;
}
</style>
