<template>
  <ul class="cart-list sheet">
    <CartListItem
      v-for="pizza in pizzaItems"
      :key="pizza.id"
      :pizza="pizza"
      @onCountChange="onCountChange($event, pizza.id)"
      @onEdit="onEdit"
    />
  </ul>
</template>

<script>
import CartListItem from "@/modules/cart/components/CartPizzaListItem";
import { mapActions, mapState } from "vuex";

export default {
  name: "CartList",

  components: {
    CartListItem,
  },

  computed: {
    ...mapState("Cart/CartPizzaList", ["pizzaItems"]),
  },

  methods: {
    ...mapActions("Cart/CartPizzaList", ["countChange", "edit"]),

    onCountChange(evtData, pizzaId) {
      this.countChange({ evtData, pizzaId });
    },

    onEdit(pizzaId) {
      this.edit(pizzaId);
    },
  },
};
</script>
