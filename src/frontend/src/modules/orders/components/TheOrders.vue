<template>
  <main class="layout">
    <div class="layout__sidebar sidebar">
      <router-link to="/" class="logo layout__logo">
        <img
          src="../../../assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>

      <a class="layout__link layout__link--active" href="#">История заказов</a>
      <a class="layout__link" href="#">Мои данные</a>
    </div>

    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">История заказов</h1>
      </div>

      <OrderItem />
    </div>
  </main>
</template>

<script>
import OrderItem from "src/modules/orders/components/OrderItem";

export default {
  name: "TheOrders",

  components: {
    OrderItem,
  },
};
</script>
