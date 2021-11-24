<template>
  <main class="content">
    <TheBuilder />
    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>
  </main>
</template>

<script>
import TheBuilder from "@/modules/builder/components/TheBuilder";

export default {
  name: "Index",

  components: {
    TheBuilder,
  },
};
</script>
