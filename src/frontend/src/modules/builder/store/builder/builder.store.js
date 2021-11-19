import BuilderDough from "@/modules/builder/store/builder-dough/builder-dough.store";
import BuilderSize from "@/modules/builder/store/builder-size/builder-size.store";
import BuilderMakeForm from "@/modules/builder/store/builder-make-form/builder-make-form.store";
import BuilderIngredients from "@/modules/builder/store/builder-ingredients/builder-ingredients.store";
import {
  buildEditToCart,
  buildPizzaToCart,
} from "@/modules/builder/store/builder/helpers";
import BuilderSauce from "@/modules/builder/store/builder-sauce/builder-sauce.store";

import router from "@/router";

export default {
  namespaced: true,

  getters: {
    totalPrice(state, getters, rootState, rootGetters) {
      return (
        rootGetters["Builder/BuilderSize/currentMultiplier"] *
          rootGetters["Builder/BuilderDough/totalPrice"] +
        rootGetters["Builder/BuilderSauce/totalPrice"] +
        rootGetters["Builder/BuilderIngredients/ingredientsPrice"]
      );
    },
  },

  actions: {
    resetState({ dispatch }) {
      dispatch("Builder/BuilderDough/resetState", undefined, { root: true });
      dispatch("Builder/BuilderSize/resetState", undefined, { root: true });
      dispatch("Builder/BuilderSauce/resetState", undefined, { root: true });
      dispatch("Builder/BuilderIngredients/resetState", undefined, {
        root: true,
      });
      dispatch("Builder/BuilderMakeForm/resetState", undefined, { root: true });
    },

    makePizza({ dispatch, rootState, rootGetters }) {
      if (rootState.Cart.isEdit) {
        dispatch(
          "Cart/CartPizzaList/update",
          buildEditToCart(rootState, rootGetters),
          { root: true }
        );
        router.push("/cart");
      } else {
        dispatch(
          "Cart/CartPizzaList/add",
          buildPizzaToCart(rootState, rootGetters),
          { root: true }
        );
      }

      dispatch("resetState");
    },
  },

  modules: {
    BuilderDough,
    BuilderSize,
    BuilderMakeForm,
    BuilderIngredients,
    BuilderSauce,
  },
};
