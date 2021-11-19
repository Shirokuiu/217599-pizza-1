import { uniqueId } from "lodash";
import { buildPizzaDescription } from "@/common/helpers";

export const buildCartPizza = ({
  doughs,
  ingredients,
  pizzaName,
  sauces,
  sizes,
  price,
  quantity = 1,
}) => ({
  id: parseInt(uniqueId(), 10),
  counter: {
    value: quantity,
    maxInc: undefined,
    maxDec: 1,
  },
  totalPrice: price * quantity,
  pizzaName,
  description: buildPizzaDescription({ doughs, ingredients, sauces, sizes }),
  doughs,
  sizes,
  sauces,
  ingredients,
  price,
});
