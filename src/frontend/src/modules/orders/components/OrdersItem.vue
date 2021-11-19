<template>
  <section class="sheet order">
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #{{ order.id }}</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: {{ order.orderPrice }} ₽</span>
      </div>

      <div class="order__button">
        <AppBtn
          description="Удалить"
          @onBtnClick="$emit('removeOrder', order.id)"
          class="button--border"
        />
      </div>
      <div class="order__button">
        <AppBtn description="Повторить" @onBtnClick="$emit('repeatOrder')" />
      </div>
    </div>

    <OrderProductList :pizzas="order.pizzas" />

    <OrderAdditionalList :misc="order.misc"></OrderAdditionalList>

    <p class="order__address">Адрес доставки: {{ address }}</p>
  </section>
</template>

<script>
import OrderProductList from "@/modules/orders/components/OrderProductList";
import OrderAdditionalList from "@/modules/orders/components/OrderAdditionalList";
import AppBtn from "@/common/components/AppBtn";

const NO_ADDRESS_NAME = "Заберу сам";

export default {
  name: "OrdersItem",

  components: {
    OrderProductList,
    OrderAdditionalList,
    AppBtn,
  },

  props: {
    order: {
      type: Object,
      required: true,
    },
  },

  computed: {
    address() {
      const hasAddress = this.order.address;

      return hasAddress ? this.order.address.name : NO_ADDRESS_NAME;
    },
  },
};
</script>
