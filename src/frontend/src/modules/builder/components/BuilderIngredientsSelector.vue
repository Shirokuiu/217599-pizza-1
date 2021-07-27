<template>
  <div class="content__ingridients">
    <AppWidget title="Выберите ингридиенты" class="ingridients">
      <div class="ingridients__sauce">
        <p>Основной соус:</p>
        <AppRadioButton
          v-for="{ value, name, isChecked, id } of sauces"
          :key="id"
          class="ingridients__input"
          radio-name="sauce"
          :value="value"
          :is-checked="isChecked"
          :name="name"
          @onRadioChange="onSauceChange($event, id)"
        />
      </div>

      <BuilderPizzaView />
    </AppWidget>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import AppWidget from "src/common/components/AppWidget";
import AppRadioButton from "src/common/components/AppRadioButton";
import BuilderPizzaView from "src/modules/builder/components/BuilderPizzaView";

export default {
  name: "BuilderIngredientsSelector",

  components: {
    AppWidget,
    AppRadioButton,
    BuilderPizzaView,
  },

  computed: {
    ...mapState("Builder", ["sauces"]),
  },

  created() {
    this.getSauces();
  },

  methods: {
    ...mapActions("Builder", ["setCurrentSauce", "getSauces"]),

    onSauceChange({ name, price }, id) {
      this.setCurrentSauce({ name, price, id });
    },
  },
};
</script>
