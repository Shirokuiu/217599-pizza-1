import {
  normalizeIngredients,
  normalizeSizes,
  normalizeSauces,
  normalizeDoughs,
} from "src/common";
import pizza from "src/static/pizza.json";
import {
  EDIT_INGREDIENTS,
  RESET_STATE,
  SET_CURRENT_DOUGH,
  SET_CURRENT_SAUCE,
  SET_CURRENT_SIZE,
  SET_DOUGHS,
  SET_PIZZA_NAME,
  SET_SAUCES,
  SET_SIZES,
} from "src/store/modules/builder/mutation-types";

const doughClassMap = {
  light: "small",
  large: "big",
};

const multipleModMap = {
  2: "second",
  3: "third",
};

const setCurrentAdditional = (arr, currentAdditional) =>
  arr.map((item) => ({
    ...item,
    isChecked: item.value.name === currentAdditional.name,
  }));

let doughsCache = [];
let sizesCache = [];
let saucesCache = [];

const initialState = () => {
  const ingredients = normalizeIngredients(pizza.ingredients);

  return {
    doughs: doughsCache,
    sizes: sizesCache,
    sauces: saucesCache,
    ingredients,

    currentDough: {
      id: 1,
      image: "/public/img/dough-large.svg",
      name: "large",
      price: 300,
    },

    currentSize: {
      id: 2,
      image: "/public/img/diameter.svg",
      multiplier: 3,
      name: "big",
    },

    currentSauce: {
      id: 1,
      name: "tomato",
      price: 50,
    },

    pizzaName: "",
  };
};

export default {
  namespaced: true,

  state: initialState(),

  getters: {
    totalPricePizza(state) {
      return (
        (state.currentDough.price +
          state.currentSauce.price +
          state.ingredients.reduce((a, b) => a + (b["totalPrice"] || 0), 0)) *
        state.currentSize.multiplier
      );
    },

    isIngredientsExist(state) {
      return state.ingredients.some(({ count }) => count > 0);
    },

    currentDoughPizzaMod(state) {
      return `pizza--foundation--${doughClassMap[state.currentDough.name]}-${
        state.currentSauce.name
      }`;
    },

    filling(state) {
      let fillingItems = [];
      let fillingItemsMap = {};

      state.ingredients.forEach((ingredient) => {
        if (ingredient.count > 0) {
          fillingItemsMap = {
            ...fillingItemsMap,
            [ingredient.mod]: ingredient.count,
          };
        }
      });

      Object.keys(fillingItemsMap).forEach((key) => {
        fillingItems.push({
          id: key,
          mod: key,
          multipleMod: multipleModMap[fillingItemsMap[key]],
          count: fillingItemsMap[key],
        });
      });

      return fillingItems;
    },
  },

  mutations: {
    // NOTE ESLint глючит
    // eslint-disable-next-line no-unused-vars
    [RESET_STATE](state) {
      state = Object.assign(state, initialState());
    },

    [SET_DOUGHS](state, doughs) {
      state.doughs = doughs;
    },

    [SET_SIZES](state, sizes) {
      state.sizes = sizes;
    },

    [SET_SAUCES](state, sauces) {
      state.sauces = sauces;
    },

    [SET_CURRENT_DOUGH](state, currentDough) {
      state.currentDough = currentDough;
      state.doughs = setCurrentAdditional(state.doughs, currentDough);
    },

    [SET_CURRENT_SIZE](state, currentSize) {
      state.currentSize = currentSize;
      state.sizes = setCurrentAdditional(state.sizes, currentSize);
    },

    [SET_CURRENT_SAUCE](state, currentSauce) {
      state.currentSauce = currentSauce;
      state.sauces = setCurrentAdditional(state.sauces, currentSauce);
    },

    [SET_PIZZA_NAME](state, pizzaName) {
      state.pizzaName = pizzaName;
    },

    [EDIT_INGREDIENTS](state, ingredients) {
      state.ingredients = ingredients;
    },
  },

  actions: {
    resetState({ commit }) {
      commit(RESET_STATE);
    },

    async getDoughs({ commit }) {
      let doughs = [];

      if (!doughsCache.length) {
        doughs = await this.$api.dough.getDoughs();

        doughs = normalizeDoughs(doughs);

        doughsCache = doughs;
      }

      commit(SET_DOUGHS, doughsCache);
    },

    async getSizes({ commit }) {
      let sizes = [];

      if (!sizesCache.length) {
        sizes = await this.$api.sizes.getSizes();

        sizes = normalizeSizes(sizes);

        sizesCache = sizes;
      }

      commit(SET_SIZES, sizesCache);
    },

    async getSauces({ commit }) {
      let sauces = [];

      if (!saucesCache.length) {
        sauces = await this.$api.sauces.getSauces();

        sauces = normalizeSauces(sauces);

        saucesCache = sauces;
      }

      commit(SET_SAUCES, saucesCache);
    },

    setCurrentDough({ commit }, currentDough) {
      commit(SET_CURRENT_DOUGH, currentDough);
    },

    setCurrentSize({ commit }, currentSize) {
      commit(SET_CURRENT_SIZE, currentSize);
    },

    setCurrentSauce({ commit }, currentSauce) {
      commit(SET_CURRENT_SAUCE, currentSauce);
    },

    setPizzaName({ commit }, pizzaName) {
      commit(SET_PIZZA_NAME, pizzaName);
    },

    editIngredients({ commit }, ingredients) {
      commit(EDIT_INGREDIENTS, ingredients);
    },

    edit({ dispatch }, cartItem) {
      dispatch("setCurrentDough", cartItem.dough);
      dispatch("setCurrentSize", cartItem.size);
      dispatch("setCurrentSauce", cartItem.sauce);
      dispatch("setPizzaName", cartItem.name);
      dispatch("editIngredients", cartItem.ingredients);
    },
  },
};
