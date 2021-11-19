<template>
  <AppDrag :transfer-data="ingredient" :draggable="!disablePlus">
    <li class="ingridients__item">
      <span class="filling" :class="`filling--${ingredient.classMod}`">{{
        ingredient.name
      }}</span>

      <AppCounter
        :is-disable-minus="disableMinus"
        :is-disable-plus="disablePlus"
        :count="ingredient.counter.value"
        @onCountEvt="onCountChange($event)"
        class="counter--orange ingridients__counter"
      />
    </li>
  </AppDrag>
</template>

<script>
import AppCounter from "@/common/components/AppCounter";
import AppDrag from "@/common/components/AppDrag";

export default {
  name: "IngredientItem",

  components: {
    AppCounter,
    AppDrag,
  },

  props: {
    ingredient: {
      type: Object,
      required: true,
    },
  },

  computed: {
    disableMinus() {
      return this.ingredient.counter.maxDec >= this.ingredient.counter.value;
    },

    disablePlus() {
      return this.ingredient.counter.maxInc <= this.ingredient.counter.value;
    },
  },

  methods: {
    onCountChange(countEvt) {
      this.$emit("onCountChange", countEvt);
    },
  },
};
</script>
