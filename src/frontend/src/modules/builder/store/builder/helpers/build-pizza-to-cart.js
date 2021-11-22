export const buildPizzaToCart = (rootState, rootGetters) => {
  const { Builder } = rootState;
  const {
    BuilderDough,
    BuilderSize,
    BuilderIngredients,
    BuilderSauce,
    BuilderMakeForm,
  } = Builder;

  return {
    doughs: BuilderDough.doughs,
    sizes: BuilderSize.sizes,
    sauces: BuilderSauce.sauces,
    ingredients: BuilderIngredients.ingredients,
    pizzaName: BuilderMakeForm.pizzaName,
    price: rootGetters["Builder/totalPrice"],
    quantity: 1,
  };
};
