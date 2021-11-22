<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>

    <OrdersList />
  </div>
</template>

<script>
import OrdersList from "@/modules/orders/components/OrdersList";
import { mapActions } from "vuex";

export default {
  name: "TheOrders",

  components: {
    OrdersList,
  },

  created() {
    this.init();
  },

  methods: {
    ...mapActions("Orders/OrdersList", ["init"]),
  },
};
</script>
