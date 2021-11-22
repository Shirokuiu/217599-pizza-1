<template>
  <label class="input" :class="classMod ? `input--${classMod}` : undefined">
    <span>{{ label }}</span>
    <input
      :type="type"
      :name="name"
      :value="value"
      :placeholder="placeholder"
      :disabled="isDisabled"
      @input="onInput"
    />
  </label>
</template>

<script>
export default {
  name: "AppInput",

  props: {
    value: {
      type: String,
      default: "",
    },

    classMod: {
      type: String,
      default: undefined,
      validation: () => [undefined, "big-label"].includes(this.classMod),
    },

    label: {
      type: String,
      default: "Текст",
    },

    type: {
      type: String,
      default: "text",
      validation: () => ["text", "email", "password"].includes(this.type),
    },

    name: {
      type: String,
      default: "name",
    },

    placeholder: {
      type: String,
      default: "Введите значение",
    },

    isDisabled: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onInput(evt) {
      this.$emit("input", evt.target.value);
    },
  },
};
</script>
