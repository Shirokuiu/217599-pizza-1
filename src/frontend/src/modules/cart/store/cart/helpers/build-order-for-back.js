import { getChecked } from "@/common/helpers";

const getUserId = (rootState) => {
  return rootState.Auth.user ? rootState.Auth.user.id : null;
};

const buildAddress = (rootGetters) => {
  const address =
    rootGetters["Cart/CartMakeOrder/currentFormAddress"].form.address;

  const res = Object.keys(address)
    .filter((it) => !["phone"].includes(it))
    .reduce((obj, v) => {
      obj[v] = address[v].value;

      return obj;
    }, {});

  const isEmpty = Object.keys(res).length === 0;

  return !isEmpty ? res : null;
};

const buildPhone = (rootGetters) => {
  const phone =
    rootGetters["Cart/CartMakeOrder/currentFormAddress"].form.address.phone;
  const isEmpty = phone.length === 0;

  return !isEmpty ? phone : undefined;
};

const buildPizzas = (rootState) =>
  rootState.Cart.CartPizzaList.pizzaItems.map(
    ({ pizzaName, sauces, doughs, sizes, counter, ingredients }) => ({
      name: pizzaName,
      sauceId: getChecked(sauces).id,
      doughId: getChecked(doughs).id,
      sizeId: getChecked(sizes).id,
      quantity: counter.value,
      ingredients: ingredients
        .filter(({ counter }) => counter.value !== 0)
        .map(({ id, counter }) => ({
          ingredientId: id,
          quantity: counter.value,
        })),
    })
  );

const buildMisc = (rootState) =>
  rootState.Cart.CartAdditionalList.additionals
    .filter(({ counter }) => counter.value !== 0)
    .map(({ id, counter }) => ({
      miscId: id,
      quantity: counter.value,
    }));

export const buildOrderForBack = ({ rootState, rootGetters }) => {
  const res = {
    userId: getUserId(rootState),
    phone: buildPhone(rootGetters),
    address: buildAddress(rootGetters),
    pizzas: buildPizzas(rootState),
    misc: buildMisc(rootState),
  };

  return Object.keys(res)
    .filter((it) => res[it] !== undefined)
    .reduce((obj, v) => {
      obj[v] = res[v];

      return obj;
    }, {});
};
