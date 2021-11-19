<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">{{ title }}</h2>
    <slot />
  </div>
</template>

<script>
export default {
  name: "AppWidget",

  props: {
    title: {
      type: String,
      default: "Заголовок",
    },
  },
};
</script>
