import {
  RESET_STATE,
  SET_PIZZA_NAME,
} from "@/modules/builder/store/builder-make-form/mutation-types";
import { buildSizeClass } from "@/modules/builder/store/builder-make-form/helpers";
import { buildSauceClass } from "@/modules/builder/store/builder-make-form/helpers/build-sauce-class";
import { buildFillingClasses } from "@/modules/builder/store/builder-make-form/helpers/build-filling-classes";

const initialState = () => ({
  pizzaName: "",
});

export default {
  namespaced: true,

  state: initialState(),

  getters: {
    sizeClass(state, getters, rootState) {
      const { Builder } = rootState;
      const { BuilderDough, BuilderSauce } = Builder;

      const sizeClass = buildSizeClass(BuilderDough.doughs);
      const sauceClass = buildSauceClass(BuilderSauce.sauces);

      return `${sizeClass}-${sauceClass}`;
    },

    fillingClasses(state, getters, rootState) {
      const { Builder } = rootState;
      const { BuilderIngredients } = Builder;

      return buildFillingClasses(BuilderIngredients.ingredients);
    },

    isMakeEnabled(state, getters, rootState) {
      const { Builder } = rootState;
      const { BuilderIngredients } = Builder;

      return (
        Boolean(state.pizzaName.length) &&
        BuilderIngredients.ingredients.some(({ counter }) => counter.value > 0)
      );
    },
  },

  mutations: {
    // eslint-disable-next-line no-unused-vars
    [RESET_STATE](state) {
      state = Object.assign(state, initialState());
    },

    [SET_PIZZA_NAME](state, payload) {
      state.pizzaName = payload;
    },
  },

  actions: {
    setPizzaName({ commit }, value) {
      commit(SET_PIZZA_NAME, value);
    },

    resetState({ commit }) {
      commit(RESET_STATE);
    },
  },
};
