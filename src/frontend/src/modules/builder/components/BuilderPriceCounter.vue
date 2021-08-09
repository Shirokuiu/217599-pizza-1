<template>
  <AppDrop @drop="onIngredientDrop">
    <div class="content__pizza">
      <label class="input">
        <span class="visually-hidden">Название пиццы</span>
        <AppInputText
          name="pizza_name"
          placeholder="Введите название пиццы"
          :value="pizzaName"
          @onInput="onInputTitle"
        />
      </label>

      <div class="content__constructor">
        <div :class="['pizza', `${currentDoughPizzaMod}`]">
          <div class="pizza__wrapper">
            <div
              v-for="fillingItem of filling"
              :key="fillingItem.id"
              :class="[
                'pizza__filling',
                `pizza__filling--${fillingItem.mod}`,
                fillingItem.multipleMod
                  ? `pizza__filling--${fillingItem.multipleMod}`
                  : undefined,
              ]"
            ></div>
          </div>
        </div>
      </div>

      <div class="content__result">
        <p>Итого: {{ normalizedTotalPrice }} ₽</p>

        <AppBtn
          :isDisabled="!this.isIngredientsExist || pizzaName.length === 0"
          text="Готовьте!"
          @onCLickBtn="onCLickBtn"
        />
      </div>
    </div>
  </AppDrop>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { numberWithSpace } from "src/common/helpers";
import AppDrop from "src/common/components/AppDrop";
import AppInputText from "src/common/components/AppInputText";
import AppBtn from "src/common/components/AppBtn";

export default {
  name: "BuilderPriceCounter",

  components: {
    AppDrop,
    AppInputText,
    AppBtn,
  },

  computed: {
    ...mapGetters("Builder", [
      "totalPricePizza",
      "isIngredientsExist",
      "currentDoughPizzaMod",
      "filling",
    ]),
    ...mapState("Builder", [
      "pizzaName",
      "currentDough",
      "currentSize",
      "currentSauce",
    ]),

    normalizedTotalPrice() {
      return numberWithSpace(this.totalPricePizza);
    },
  },

  methods: {
    ...mapActions("Builder", {
      inc: "inc",
      setPizzaName: "setPizzaName",
    }),
    ...mapActions("Cart", {
      addToCart: "addToCart",
    }),

    onIngredientDrop(ingredientData) {
      const { currentIngredientIndex } = ingredientData;

      this.inc(currentIngredientIndex);
    },

    onInputTitle(value) {
      this.setPizzaName(value);
    },

    onCLickBtn() {
      this.addToCart();
    },
  },
};
</script>
