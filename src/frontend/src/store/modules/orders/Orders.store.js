import { SET_ORDERS } from "src/store/modules/orders/mutation-types";
import { modIngredientMap } from "src/common/constants";

const sizeMap = {
  small: "23 см",
  normal: "32 см",
  big: "45 см",
};

const doughMap = {
  light: "на тонком тесте",
  large: "на толстом тесте",
};

const sauceMap = {
  tomato: "томатный",
  creamy: "кремовый",
};

const buildDescriptionsFilling = ({
  sizeName,
  doughName,
  sauceName,
  ingredients,
}) => [
  `${sizeMap[sizeName]}, ${doughMap[doughName]}`,
  `Соус: ${sauceMap[sauceName]}`,
  `Начинка: ${ingredients
    .map(({ mod }) =>
      modIngredientMap.find(({ value }) => mod === value).name.toLowerCase()
    )
    .join(", ")}`,
];

const normalizeOrders = (orders, rootState) => {
  const testOrders = orders.map((order) => ({
    address: order.address,
    id: order.id,

    orderPizzas: order.orderPizzas.map((orderPizza) => {
      const size = rootState.Builder.sizes.find(
        ({ id }) => id === orderPizza.sizeId
      );
      const dough = rootState.Builder.doughs.find(
        ({ id }) => id === orderPizza.doughId
      );
      const sauce = rootState.Builder.sauces.find(
        ({ id }) => id === orderPizza.sauceId
      );
      const ingredients = rootState.Builder.ingredients
        .filter(({ id }) =>
          orderPizza.ingredients.some(
            (ingredient) => ingredient.ingredientId === id
          )
        )
        .map((ingredient, idx) => ({
          ...ingredient,
          count: orderPizza.ingredients[idx].quantity,
          totalPrice: orderPizza.ingredients[idx].quantity * ingredient.price,
        }));

      console.log(sizeMap[size.value.name], doughMap[dough.value.name]);

      return {
        name: orderPizza.name,
        dough,
        size,
        sauce,
        descriptionsFilling: buildDescriptionsFilling({
          sizeName: size.value.name,
          doughName: dough.value.name,
          sauceName: sauce.value.name,
          ingredients,
        }),
      };
    }),
    // price: rootGetters["Builder/totalPricePizza"],

    // dough: rootState.Builder.currentDough,
    // size: rootState.Builder.currentSize,
    // sauce: rootState.Builder.currentSauce,

    // ingredients: cloneDeep(rootState.Builder.ingredients),
    // descriptionsFilling: buildDescriptionsFilling(
    //   getDescriptionNames(rootState)
    // ),
    // totalPrice: rootGetters["Builder/totalPricePizza"] * count,
  }));

  console.log(testOrders);

  return orders;
};

// const updatedCartItem = (rootState, rootGetters, count = 1) => {
//   return {
//     name: rootState.Builder.pizzaName,
//     price: rootGetters["Builder/totalPricePizza"],
//     dough: rootState.Builder.currentDough,
//     size: rootState.Builder.currentSize,
//     sauce: rootState.Builder.currentSauce,
//     ingredients: cloneDeep(rootState.Builder.ingredients),
//     descriptionsFilling: buildDescriptionsFilling(
//       getDescriptionNames(rootState)
//     ),
//     totalPrice: rootGetters["Builder/totalPricePizza"] * count,
//   };
// };

export default {
  namespaced: true,

  state: {
    orders: [],
  },

  mutations: {
    [SET_ORDERS](state, orders) {
      state.orders = orders;
    },
  },

  actions: {
    async getOrders({ commit, rootState }) {
      const orders = await this.$api.orders.getOrders();

      commit(SET_ORDERS, normalizeOrders(orders, rootState));
    },
  },
};
