<template>
  <div class="ingridients__sauce">
    <p>Основной соус:</p>

    <label
      v-for="sauce in sauces"
      :key="sauce.value"
      class="radio ingridients__input"
    >
      <input
        type="radio"
        name="sauce"
        :value="sauce.value"
        :checked="sauce.isChecked"
        @change="onSauceChange(sauce.id)"
      />
      <span>{{ sauce.name }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: "BuilderSauce",

  props: {
    sauces: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    onSauceChange(id) {
      this.$emit("onSauceChange", id);
    },
  },
};
</script>
