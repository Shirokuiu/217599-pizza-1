<template>
  <main class="content">
    <TheBuilder />
    <router-view></router-view>
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
