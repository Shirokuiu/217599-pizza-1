import Vue from "vue";
import { uniqueId, cloneDeep } from "lodash";
import router from "src/router";
import {
  ADD_TO_CART,
  EDIT_CART_ITEM,
  RESET_STATE,
  SET_ADDITIONAL_ITEMS,
  SET_FORM,
  TOGGLE_EDIT_MODE,
} from "src/store/modules/cart/mutation-types";
import { normalizeMisc } from "src/common";
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

const getActiveIngredients = (ingredients) =>
  ingredients.filter(({ count }) => count);

const buildDescriptionsFilling = ({
  sizeName,
  doughName,
  sauceName,
  ingredients,
}) => [
  `${sizeMap[sizeName]}, ${doughMap[doughName]}`,
  `Соус: ${sauceMap[sauceName]}`,
  `Начинка: ${getActiveIngredients(ingredients)
    .map(({ mod }) =>
      modIngredientMap.find(({ value }) => mod === value).name.toLowerCase()
    )
    .join(", ")}`,
];

const getDescriptionNames = (rootState) => ({
  sizeName: rootState.Builder.currentSize.name,
  doughName: rootState.Builder.currentDough.name,
  sauceName: rootState.Builder.currentSauce.name,
  ingredients: rootState.Builder.ingredients,
});

const updatedCartItem = (rootState, rootGetters, count = 1) => {
  return {
    name: rootState.Builder.pizzaName,
    price: rootGetters["Builder/totalPricePizza"],
    dough: rootState.Builder.currentDough,
    size: rootState.Builder.currentSize,
    sauce: rootState.Builder.currentSauce,
    ingredients: cloneDeep(rootState.Builder.ingredients),
    descriptionsFilling: buildDescriptionsFilling(
      getDescriptionNames(rootState)
    ),
    totalPrice: rootGetters["Builder/totalPricePizza"] * count,
  };
};

const buildNewCartItem = (rootState, rootGetters) => {
  return {
    ...updatedCartItem(rootState, rootGetters),
    id: uniqueId(),
    count: 1,
    maxInc: undefined,
    maxDec: 1,
  };
};

const buildOrderAddress = (state) => {
  return Object.keys(state.form.$params).reduce(
    (obj, v) => {
      obj[v].value = state.form[v].$model;

      return obj;
    },
    {
      street: {
        value: "",
      },
      building: {
        value: "",
      },
      flat: {
        value: "",
      },
      comment: {
        value: "",
      },
    }
  );
};

const buildOrderPizzas = (state) =>
  state.cartItems.map(({ name, sauce, dough, size, count, ingredients }) => ({
    name: name,
    sauceId: sauce.id,
    doughId: dough.id,
    sizeId: size.id,
    quantity: count,
    ingredients: getActiveIngredients(ingredients).map(({ id, count }) => ({
      ingredientId: id,
      quantity: count,
    })),
  }));

const buildOrderMisc = (state) =>
  getActiveIngredients(state.additionalItems).map(({ id, count }) => ({
    miscId: id,
    quantity: count,
  }));

const buildOrder = (state, rootState) => {
  const userId = rootState.Auth.user ? rootState.Auth.user.id : null;

  return {
    userId,
    address: buildOrderAddress(state),
    misc: buildOrderMisc(state),
    pizzas: buildOrderPizzas(state),
  };
};

let additionalItemsCache = [];

const initialState = () => ({
  cartItems: [],
  form: undefined,
  additionalItems: additionalItemsCache,
  editMode: {
    isEdit: false,
    currentEditableItemIndex: undefined,
  },
});

export default {
  namespaced: true,

  state: initialState(),

  getters: {
    totalPriceCart(state) {
      return (
        state.cartItems.reduce((a, b) => a + (b["totalPrice"] || 0), 0) +
        state.additionalItems.reduce((a, b) => a + (b["totalPrice"] || 0), 0)
      );
    },
  },

  mutations: {
    // NOTE ESLint глючит
    // eslint-disable-next-line no-unused-vars
    [RESET_STATE](state) {
      state = Object.assign(state, initialState());
    },

    [SET_ADDITIONAL_ITEMS](state, additionalItems) {
      state.additionalItems = additionalItems;
    },

    [SET_FORM](state, form) {
      state.form = form;
    },

    [ADD_TO_CART](state, cartItem) {
      state.cartItems.push(cartItem);
    },

    [EDIT_CART_ITEM](state, { updatedCart, currentCartIndex }) {
      Vue.set(state.cartItems, currentCartIndex, {
        ...state.cartItems[currentCartIndex],
        ...updatedCart,
      });
    },

    [TOGGLE_EDIT_MODE](state, { isEdit, currentEditableItemIndex }) {
      state.editMode = {
        isEdit,
        currentEditableItemIndex,
      };
    },
  },

  actions: {
    resetState({ commit }) {
      commit(RESET_STATE);
    },

    async getMisc({ commit }) {
      let additionalItems = [];

      if (!additionalItemsCache.length) {
        additionalItems = await this.$api.misc.getMisc();

        additionalItems = normalizeMisc(additionalItems);

        additionalItemsCache = additionalItems;
      }

      commit(SET_ADDITIONAL_ITEMS, additionalItemsCache);
    },

    addToCart({ commit, dispatch, state, rootState, rootGetters }) {
      const cartItem = buildNewCartItem(rootState, rootGetters);

      if (!state.editMode.isEdit) {
        commit(ADD_TO_CART, cartItem);
        dispatch("Builder/resetState", undefined, { root: true });

        return;
      }

      commit(EDIT_CART_ITEM, {
        updatedCart: updatedCartItem(
          rootState,
          rootGetters,
          state.cartItems[state.editMode.currentEditableItemIndex].count
        ),
        currentCartIndex: state.editMode.currentEditableItemIndex,
      });

      // NOTE Так как в ТЗ не описано поведение,
      // "что будет после нажатия на кнопку - Готово, в режиме редактирования"
      // делаю редирект в корзину
      router.push("/cart");
    },

    setForm({ commit }, form) {
      commit(SET_FORM, form);
    },

    async submitOrder({ state, rootState }) {
      state.form.$touch();

      if (!state.form.$invalid) {
        const dataForBack = buildOrder(state, rootState);

        try {
          await this.$api.orders.addOrder(dataForBack);

          return Promise.resolve();
        } catch (e) {
          return Promise.reject(e);
        }
      }
    },

    toggleEditMode(
      { commit },
      { isEdit, currentEditableItemIndex } = {
        isEdit: false,
        currentEditableItemIndex: null,
      }
    ) {
      commit(TOGGLE_EDIT_MODE, { isEdit, currentEditableItemIndex });
    },

    editCartItem({ dispatch, state }, currentIndex) {
      dispatch("toggleEditMode", {
        isEdit: true,
        currentEditableItemIndex: currentIndex,
      });
      router.push("/").then(() => {
        dispatch("Builder/edit", state.cartItems[currentIndex], { root: true });
      });
    },
  },
};
