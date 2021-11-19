import { buildPizzaDescription } from "@/common/helpers";

export const updateCartPizza = (cartPizza) => {
  const { doughs, sizes, sauces, ingredients, price, counter } = cartPizza;

  return {
    ...cartPizza,
    description: buildPizzaDescription({ doughs, sizes, sauces, ingredients }),
    totalPrice: price * counter.value,
  };
};
