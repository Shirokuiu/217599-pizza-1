<template>
  <select :value="selectedId" class="select" @change="onSelectChange">
    <option v-for="option in options" :key="option.id" :value="option.id">
      {{ option[keyOptionName] }}
    </option>
  </select>
</template>

<script>
export default {
  name: "AppSelect",

  props: {
    options: {
      type: Array,
      required: true,
      validation: () => [],
    },

    name: {
      type: String,
      default: "select",
    },

    keyOptionName: {
      type: String,
      default: "name",
    },

    selectedId: {
      type: Number,
      default: undefined,
    },
  },

  methods: {
    onSelectChange(evt) {
      const valueInt = parseInt(evt.target.value, 10);
      const currentOption = this.options.find(({ id }) => id === valueInt);

      this.$emit("onChange", currentOption);
    },
  },
};
</script>
