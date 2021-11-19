<template>
  <li class="cart-list__item">
    <AppProduct :product-name="pizza.pizzaName" class="cart-list__product">
      <li>{{ pizza.description.size }}, {{ pizza.description.dough }}</li>
      <li>Соус: {{ pizza.description.sauce }}</li>
      <li>Начинка: {{ pizza.description.ingredients }}</li>
    </AppProduct>

    <AppCounter
      :count="pizza.counter.value"
      :is-disable-minus="disableMinus"
      @onCountEvt="onCountChange($event)"
      color="orange"
      class="cart-list__counter"
    />

    <div class="cart-list__price">
      <b>{{ pizza.totalPrice }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button @click="onEditClick" type="button" class="cart-list__edit">
        Изменить
      </button>
    </div>
  </li>
</template>

<script>
import AppCounter from "@/common/components/AppCounter";
import AppProduct from "@/common/components/AppProduct";

export default {
  name: "CartListItem",

  components: {
    AppCounter,
    AppProduct,
  },

  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },

  computed: {
    disableMinus() {
      return this.pizza.counter.maxDec >= this.pizza.counter.value;
    },
  },

  methods: {
    onCountChange(countEvt) {
      this.$emit("onCountChange", countEvt);
    },

    onEditClick() {
      this.$emit("onEdit", this.pizza.id);
    },
  },
};
</script>
