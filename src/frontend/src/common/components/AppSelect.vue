<template>
  <select :name="name" class="select" @change="onChange">
    <option v-for="{ id, value, name } of options" :value="value" :key="id">
      {{ name }}
    </option>
  </select>
</template>

<script>
export default {
  name: "AppSelect",

  props: {
    name: {
      type: String,
      default: "select",
    },

    options: {
      type: Array,
      default: () => [
        {
          id: 1,
          value: 1,
          name: "Выбор",
        },
        {
          id: 2,
          value: 2,
          name: "Выбор 2",
        },
        {
          id: 3,
          value: 3,
          name: "Выбор 3",
        },
      ],
    },
  },

  methods: {
    onChange(evt) {
      const { target } = evt;

      this.$emit("selectChange", target.value);
    },
  },
};
</script>
