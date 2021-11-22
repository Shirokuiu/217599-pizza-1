<template>
  <ul class="order__additional">
    <li v-for="miscItem in miscItems" :key="miscItem.id">
      <img
        :src="`/img/${miscItem.image}`"
        width="20"
        height="30"
        :alt="miscItem.name"
      />
      <p>
        <span>{{ miscItem.name }}</span>
        <b>{{ miscItem.totalPrice }} ₽</b>
      </p>
    </li>
  </ul>
</template>

<script>
export default {
  name: "OrderAdditionalList",

  props: {
    misc: {
      type: Array,
      required: true,
      validation: () => [],
    },
  },

  computed: {
    miscItems() {
      return this.misc.filter(({ counter }) => counter.value !== 0);
    },
  },
};
</script>
