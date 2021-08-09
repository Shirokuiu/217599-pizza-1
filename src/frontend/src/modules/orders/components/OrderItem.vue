<template>
  <section class="sheet order">
    <OrderItemControls />

    <OrderItemList />

    <OrderItemAdditional />

    <p class="order__address">
      Адрес доставки: Тест (или если адрес новый - писать целиком)
    </p>
  </section>
</template>

<script>
import OrderItemControls from "src/modules/orders/components/OrderItemControls";
import OrderItemList from "src/modules/orders/components/OrderItemList";
import OrderItemAdditional from "src/modules/orders/components/OrderItemAdditional";

export default {
  name: "OrderItem",

  components: {
    OrderItemControls,
    OrderItemList,
    OrderItemAdditional,
  },
};
</script>
