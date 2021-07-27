import Vue from "vue";
import { uniqueId, cloneDeep } from "lodash";
import router from "src/router";
import {
  ADD_TO_CART,
  EDIT_CART_ITEM,
  TOGGLE_EDIT_MODE,
} from "src/store/modules/cart/mutation-types";
import { normalizeMisc } from "src/common";
import misc from "src/static/misc";
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
    .filter(({ count }) => count)
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

const initialState = () => ({
  cartItems: [],
  additionalItems: normalizeMisc(misc),
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

    submitOrder() {
      router.push("/");
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
