<template>
  <div>
    <OrdersItem
      v-for="order in orders"
      :key="order.id"
      :order="order"
      @removeOrder="removeOrder"
      @repeatOrder="makeOrder(order)"
    />
  </div>
</template>

<script>
import OrdersItem from "@/modules/orders/components/OrdersItem";
import { mapActions, mapState } from "vuex";

export default {
  name: "OrdersList",

  components: {
    OrdersItem,
  },

  computed: {
    ...mapState("Orders/OrdersList", ["orders"]),
  },

  methods: {
    ...mapActions("Orders/OrdersList", ["deleteOrder", "repeatOrder"]),

    removeOrder(id) {
      this.deleteOrder(id);
    },

    makeOrder(order) {
      this.repeatOrder(order);
    },
  },
};
</script>
