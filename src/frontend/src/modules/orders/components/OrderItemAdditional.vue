<template>
  <ul class="order__additional">
    <OrderAdditionalItem />
  </ul>
</template>

<script>
import OrderAdditionalItem from "src/modules/orders/components/OrderAdditionalItem";

export default {
  name: "OrderItemAdditional",

  components: {
    OrderAdditionalItem,
  },
};
</script>
