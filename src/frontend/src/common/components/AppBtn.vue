<template>
  <button
    type="button"
    class="button"
    :class="{ 'button--disabled': isDisabled }"
    :disabled="isDisabled"
    @click="onBtnClick"
  >
    {{ description }}
  </button>
</template>

<script>
export default {
  name: "AppBtn",

  props: {
    description: {
      type: String,
      default: "Кнопка",
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onBtnClick() {
      this.$emit("onBtnClick");
    },
  },
};
</script>
