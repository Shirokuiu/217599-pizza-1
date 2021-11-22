<template>
  <li class="order__item">
    <AppProduct :productName="pizza.pizzaName">
      <li>{{ description.size }}, {{ description.dough }}</li>
      <li>Соус: {{ description.sauce }}</li>
      <li>Начинка: {{ description.ingredients }}</li>
    </AppProduct>

    <p class="order__price">{{ price }} ₽</p>
  </li>
</template>

<script>
import AppProduct from "@/common/components/AppProduct";
import { buildPizzaDescription } from "@/common/helpers";

export default {
  name: "OrderProductItem",

  components: {
    AppProduct,
  },

  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },

  computed: {
    price() {
      const hasMore = this.pizza.quantity > 1;

      return hasMore
        ? `${this.pizza.quantity}х${this.pizza.price}`
        : this.pizza.price;
    },

    description() {
      return buildPizzaDescription({
        doughs: this.pizza.doughs,
        sizes: this.pizza.sizes,
        sauces: this.pizza.sauces,
        ingredients: this.pizza.ingredients,
      });
    },
  },
};
</script>
