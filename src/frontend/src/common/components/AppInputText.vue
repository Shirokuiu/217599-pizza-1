<template>
  <input
    :type="type"
    :name="name"
    :placeholder="placeholder"
    :value="value"
    @input="onInput"
  />
</template>

<script>
import { debounce } from "lodash";

const DEFAULT_DEBOUNCE = 300;

export default {
  name: "AppInputText",

  model: {
    prop: "value",
    event: "onInput",
  },

  props: {
    value: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      default: "text",
    },

    name: {
      type: String,
      default: "name",
    },

    placeholder: {
      type: String,
      default: "Введите текст",
    },
  },

  methods: {
    onInput: debounce(function (evt) {
      this.$emit("onInput", evt.target.value);
    }, DEFAULT_DEBOUNCE),
  },
};
</script>
