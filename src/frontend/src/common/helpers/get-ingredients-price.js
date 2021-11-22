export const getIngredientsPrice = (ingredients) =>
  ingredients.length
    ? ingredients.map(({ totalPrice }) => totalPrice).reduce((a, b) => a + b)
    : 0;
