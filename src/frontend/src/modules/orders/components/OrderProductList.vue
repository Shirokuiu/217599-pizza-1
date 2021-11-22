<template>
  <ul class="order__list">
    <OrderProductItem
      v-for="pizza in pizzas"
      :key="pizza.id"
      :pizza="pizza"
    ></OrderProductItem>
  </ul>
</template>

<script>
import OrderProductItem from "@/modules/orders/components/OrderProductItem";

export default {
  name: "OrderProductList",

  components: {
    OrderProductItem,
  },

  props: {
    pizzas: {
      type: Array,
      default: () => [],
      validations: () => [],
    },
  },
};
</script>
