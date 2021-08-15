<template>
  <ul class="order__list">
    <OrderPizzaItem />
  </ul>
</template>

<script>
import OrderPizzaItem from "src/modules/orders/components/OrderPizzaItem";

export default {
  name: "OrderItemList",

  components: {
    OrderPizzaItem,
  },
};
</script>
