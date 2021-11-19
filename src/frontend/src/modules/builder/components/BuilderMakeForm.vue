<template>
  <AppDrop @drop="drop($event)">
    <div class="content__pizza">
      <label class="input">
        <span class="visually-hidden">Название пиццы</span>
        <input
          type="text"
          name="pizza_name"
          placeholder="Введите название пиццы"
          :value="pizzaName"
          @input="onPizzaNameInput"
        />
      </label>

      <div class="content__constructor">
        <div :class="`pizza pizza--foundation--${sizeClass}`">
          <div class="pizza__wrapper">
            <div
              v-for="fillingClass in fillingClasses"
              class="pizza__filling"
              :class="fillingClass"
              :key="fillingClass"
            ></div>
          </div>
        </div>
      </div>

      <div class="content__result">
        <p>Итого: {{ totalPrice }} ₽</p>
        <AppBtn
          description="Готовьте!"
          :is-disabled="!isMakeEnabled"
          @onBtnClick="onMakePizzaClick"
        ></AppBtn>
      </div>
    </div>
  </AppDrop>
</template>

<script>
import AppBtn from "@/common/components/AppBtn";
import AppDrop from "@/common/components/AppDrop";
import { mapGetters, mapActions, mapState } from "vuex";
import { CountEvents } from "@/common/constants";

export default {
  name: "BuilderMakeForm",

  components: {
    AppBtn,
    AppDrop,
  },

  computed: {
    ...mapGetters("Builder", ["totalPrice"]),
    ...mapGetters("Builder/BuilderMakeForm", [
      "sizeClass",
      "fillingClasses",
      "isMakeEnabled",
    ]),
    ...mapState("Builder/BuilderMakeForm", ["pizzaName"]),
  },

  methods: {
    ...mapActions("Builder", ["makePizza"]),
    ...mapActions("Builder/BuilderIngredients", ["countChange"]),
    ...mapActions("Builder/BuilderMakeForm", ["setPizzaName"]),

    drop(ingredient) {
      const dropData = {
        evtData: {
          evtType: CountEvents.DROP,
          value: ingredient.counter.value,
        },
        ingredientId: ingredient.id,
      };

      this.countChange(dropData);
    },

    onPizzaNameInput(evt) {
      this.setPizzaName(evt.target.value);
    },

    onMakePizzaClick() {
      this.makePizza();
    },
  },
};
</script>
