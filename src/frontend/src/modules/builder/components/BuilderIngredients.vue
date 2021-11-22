<template>
  <div class="content__ingridients">
    <AppWidget title="Выберите ингридиенты">
      <div class="sheet__content ingridients">
        <BuilderSauce :sauces="sauces" @onSauceChange="onSauceChange" />

        <div class="ingridients__filling">
          <p>Начинка:</p>

          <ul class="ingridients__list">
            <IngredientItem
              v-for="ingredient in ingredients"
              :key="ingredient.id"
              :ingredient="ingredient"
              @onCountChange="onCountChange($event, ingredient.id)"
            />
          </ul>
        </div>
      </div>
    </AppWidget>
  </div>
</template>

<script>
import AppWidget from "@/common/components/AppWidget";
import BuilderSauce from "@/modules/builder/components/BuilderSauce";
import IngredientItem from "@/modules/builder/components/IngredientItem";
import { mapActions, mapState } from "vuex";

export default {
  name: "BuilderIngredients",

  components: {
    AppWidget,
    IngredientItem,
    BuilderSauce,
  },

  computed: {
    ...mapState("Builder/BuilderIngredients", ["ingredients"]),
    ...mapState("Builder/BuilderSauce", ["sauces"]),
  },

  methods: {
    ...mapActions("Builder/BuilderIngredients", ["countChange"]),
    ...mapActions("Builder/BuilderSauce", ["sauceChange"]),

    onSauceChange(id) {
      this.sauceChange(id);
    },

    onCountChange(evtData, ingredientId) {
      this.countChange({ evtData, ingredientId });
    },
  },
};
</script>
