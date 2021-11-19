export const buildEditToCart = (rootState, rootGetters) => {
  const { Cart, Builder } = rootState;
  const {
    BuilderDough,
    BuilderSize,
    BuilderSauce,
    BuilderIngredients,
    BuilderMakeForm,
  } = Builder;

  return {
    pizzaId: Cart.editPizzaId,
    updatedPizza: {
      doughs: BuilderDough.doughs,
      sizes: BuilderSize.sizes,
      sauces: BuilderSauce.sauces,
      ingredients: BuilderIngredients.ingredients,
      pizzaName: BuilderMakeForm.pizzaName,
      price: rootGetters["Builder/totalPrice"],
    },
  };
};
