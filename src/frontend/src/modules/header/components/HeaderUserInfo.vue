<template>
  <a style="cursor: pointer">
    <picture>
      <source
        type="image/webp"
        :srcset="`${user.avatar} 1x, ${user.avatar} 2x`"
      />
      <img
        :src="user.avatar"
        :srcset="user.avatar"
        alt="Василий Ложкин"
        width="32"
        height="32"
      />
    </picture>
    <span>{{ user.name }}</span>
  </a>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "HeaderUserInfo",

  computed: {
    ...mapState("Auth", ["user"]),
  },
};
</script>
