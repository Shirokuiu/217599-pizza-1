import {
  CHANGE,
  DEC,
  INC,
  ADD,
  UPDATE,
  RESET_STATE,
  SET,
} from "@/modules/cart/store/cart-pizza-list/mutation-types";
import { Count } from "@/common/helpers";
import {
  buildCartPizza,
  updateCartPizza,
} from "@/modules/cart/store/cart-pizza-list/helpers";
import router from "@/router";

const initialState = () => ({
  pizzaItems: [],
});

export default {
  namespaced: true,

  state: initialState(),

  getters: {
    totalPrice(state) {
      if (state.pizzaItems.length) {
        return state.pizzaItems
          .map(({ totalPrice }) => totalPrice)
          .reduce((a, b) => a + b);
      }

      return 0;
    },
  },

  mutations: {
    // eslint-disable-next-line no-unused-vars
    [RESET_STATE](state) {
      state = Object.assign(state, initialState());
    },

    [SET](state, pizzas) {
      state.pizzaItems = pizzas;
    },

    [ADD](state, payload) {
      state.pizzaItems = [...state.pizzaItems, payload];
    },

    [UPDATE](state, payload) {
      state.pizzaItems = payload;
    },

    [INC](state, { type, value }) {
      state.pizzaItems = Count.incDec(type, value, state.pizzaItems);
    },

    [DEC](state, { type, value }) {
      state.pizzaItems = Count.incDec(type, value, state.pizzaItems);
    },

    [CHANGE](state, { value: valueData }) {
      const { id, value } = valueData;

      state.pizzaItems = Count.change(id, value, state.pizzaItems);
    },
  },

  actions: {
    resetState({ commit }) {
      commit(RESET_STATE);
    },

    add({ commit }, pizzaItems) {
      commit(ADD, buildCartPizza(pizzaItems));
    },

    repeatOrder({ commit }, pizzas) {
      const pizzaItems = pizzas.map((pizza) => buildCartPizza(pizza));

      commit(SET, pizzaItems);
    },

    update({ commit, state }, updatedPizzaData) {
      const copyArr = [...state.pizzaItems];
      const index = copyArr.findIndex(
        ({ id }) => id === updatedPizzaData.pizzaId
      );

      copyArr[index] = {
        ...updateCartPizza({
          ...copyArr[index],
          ...updatedPizzaData.updatedPizza,
        }),
      };

      commit(UPDATE, copyArr);
    },

    countChange({ commit, state }, { evtData, pizzaId }) {
      const { evtType, value } = evtData;

      Count.buildCommitMutation(
        { arr: state.pizzaItems, arrId: pizzaId, evtType, value },
        (commitData) => {
          commit(commitData.mutationType, commitData.payload);
        }
      );
    },

    edit({ dispatch, state }, pizzaId) {
      const index = state.pizzaItems.findIndex(({ id }) => id === pizzaId);
      const currentPizzaItem = state.pizzaItems[index];

      router.push("/").then(() => {
        dispatch("Cart/setEditPizzaId", pizzaId, { root: true });
        dispatch("Cart/toggleEdit", true, { root: true });
        dispatch("Builder/BuilderDough/setDoughs", currentPizzaItem.doughs, {
          root: true,
        });
        dispatch("Builder/BuilderSize/setSizes", currentPizzaItem.sizes, {
          root: true,
        });
        dispatch("Builder/BuilderSauce/setSauces", currentPizzaItem.sauces, {
          root: true,
        });
        dispatch(
          "Builder/BuilderIngredients/setIngredients",
          currentPizzaItem.ingredients,
          { root: true }
        );
        dispatch(
          "Builder/BuilderMakeForm/setPizzaName",
          currentPizzaItem.pizzaName,
          { root: true }
        );
      });
    },
  },
};
