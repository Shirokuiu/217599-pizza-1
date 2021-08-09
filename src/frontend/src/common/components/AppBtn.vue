<template>
  <button
    type="button"
    class="button"
    :disabled="isDisabled"
    @click="$emit('onCLickBtn')"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "AppBtn",

  props: {
    text: {
      type: String,
      default: "Кнопка",
    },

    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
