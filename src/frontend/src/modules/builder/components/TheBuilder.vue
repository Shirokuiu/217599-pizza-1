<template>
  <form action="#" method="post">
    <div class="content__wrapper">
      <h1 class="title title--big">Конструктор пиццы</h1>

      <BuilderDough />

      <BuilderSize />

      <BuilderIngredients />

      <BuilderMakeForm />
    </div>
  </form>
</template>

<script>
import BuilderDough from "@/modules/builder/components/BuilderDough";
import BuilderSize from "@/modules/builder/components/BuilderSize";
import BuilderIngredients from "@/modules/builder/components/BuilderIngredients";
import BuilderMakeForm from "@/modules/builder/components/BuilderMakeForm";
import { mapActions } from "vuex";

export default {
  name: "TheBuilder",

  components: {
    BuilderDough,
    BuilderSize,
    BuilderIngredients,
    BuilderMakeForm,
  },

  beforeDestroy() {
    this.setEditPizzaId(undefined);
    this.toggleEdit(false);
    this.resetState();
  },

  methods: {
    ...mapActions("Builder", ["resetState"]),
    ...mapActions("Cart", ["setEditPizzaId", "toggleEdit"]),
  },
};
</script>
