import { getIngredientsPrice, getChecked } from "@/common/helpers";

const calculatePizzaPrice = ({ doughs, sizes, sauces, ingredients }) =>
  getChecked(sizes).multiplier * getChecked(doughs).price +
  getChecked(sauces).price +
  getIngredientsPrice(ingredients);

const calculateOrderPrice = (pizzas, misc) =>
  [
    ...pizzas.map(({ totalPrice }) => totalPrice),
    ...misc.map(({ totalPrice }) => totalPrice),
  ].reduce((a, b) => a + b);

const mapMisc = (rootMisc, orderMisc) => {
  if (!orderMisc) {
    return rootMisc;
  }

  return rootMisc.map((miscItem) => {
    const currentOrderMisc = orderMisc.find(
      ({ miscId }) => miscId === miscItem.id
    );
    const hasMisc = !!currentOrderMisc;

    return {
      ...miscItem,
      counter: {
        ...miscItem.counter,
        value: hasMisc ? currentOrderMisc.quantity : 0,
      },
      totalPrice: hasMisc ? currentOrderMisc.quantity * miscItem.price : 0,
    };
  });
};

const mapIsChecked = (arr, checkedId) =>
  arr.map((it) => ({
    ...it,
    isChecked: it.id === checkedId,
  }));

const mapIngredients = (rootIngredients, ingredients) => {
  return rootIngredients.map((ingredient) => {
    const currentIngredient = ingredients.find(
      ({ id }) => id === ingredient.id
    );
    const hasIngredient = !!currentIngredient;

    return {
      ...ingredient,
      counter: {
        ...ingredient.counter,
        value: hasIngredient ? currentIngredient.quantity : 0,
      },
      totalPrice: hasIngredient
        ? currentIngredient.quantity * ingredient.price
        : 0,
    };
  });
};

const mapPizzas = (pizzas, rootState) => {
  const rootDoughs = rootState.Builder.BuilderDough.doughs;
  const rootSizes = rootState.Builder.BuilderSize.sizes;
  const rootSauces = rootState.Builder.BuilderSauce.sauces;
  const rootIngredients = rootState.Builder.BuilderIngredients.ingredients;

  return pizzas.map((pizza) => {
    const doughs = mapIsChecked(rootDoughs, pizza.doughId);
    const sizes = mapIsChecked(rootSizes, pizza.sizeId);
    const sauces = mapIsChecked(rootSauces, pizza.sauceId);
    const ingredients = mapIngredients(rootIngredients, pizza.ingredients);
    const price = calculatePizzaPrice({ doughs, sizes, sauces, ingredients });

    return {
      id: pizza.id,
      quantity: pizza.quantity,
      pizzaName: pizza.name,
      totalPrice: price * pizza.quantity,
      price,
      doughs,
      sizes,
      sauces,
      ingredients,
    };
  });
};

export const mapOrderList = (
  orders,
  rootState,
  addresses = [],
  rootMisc = []
) =>
  orders.map((order) => {
    const pizzas = mapPizzas(
      order.orderPizzas,
      rootState,
      misc,
      order.orderMisc
    );
    const misc = mapMisc(rootMisc, order.orderMisc);

    return {
      id: order.id,
      orderPrice: calculateOrderPrice(pizzas, misc),
      address: addresses.find(({ id }) => id === order.addressId),
      misc,
      pizzas,
    };
  });
