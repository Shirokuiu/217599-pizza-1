<template>
  <div v-if="user" class="user">
    <picture>
      <source
        type="image/webp"
        srcset="
          ~@/assets/img/users/user5@2x.webp 1x,
          ~@/assets/img/users/user5@4x.webp 2x
        "
      />
      <img
        src="~@/assets/img/users/user5@2x.jpg"
        srcset="~@/assets/img/users/user5@4x.jpg"
        alt="Василий Ложкин"
        width="72"
        height="72"
      />
    </picture>
    <div class="user__name">
      <span>{{ user.name }}</span>
    </div>
    <p class="user__phone">
      Контактный телефон: <span>{{ user.phone }}</span>
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ProfileUser",

  computed: {
    ...mapState("Auth", ["user"]),
  },
};
</script>
