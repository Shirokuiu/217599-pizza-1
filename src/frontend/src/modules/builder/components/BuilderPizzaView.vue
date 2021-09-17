<template>
  <div class="ingridients__filling">
    <p>Начинка:</p>

    <ul class="ingridients__list">
      <BuilderPizzaViewItem
        v-for="(ingredient, index) of ingredients"
        :key="ingredient.id"
        :ingredient="ingredient"
        :idx="index"
      >
      </BuilderPizzaViewItem>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BuilderPizzaViewItem from "src/modules/builder/components/BuilderPizzaViewItem";

export default {
  name: "BuilderPizzaView",

  components: {
    BuilderPizzaViewItem,
  },

  computed: {
    ...mapState("Builder", ["ingredients"]),
  },
};
</script>
