import { cloneDeep } from "lodash";
import {
  INGREDIENT_INC,
  SET_INGREDIENTS,
  INGREDIENT_DEC,
  INGREDIENT_CHANGE,
  INGREDIENT_DROP,
  RESET_STATE,
} from "@/modules/builder/store/builder-ingredients/mutation-types";
import {
  CacheController,
  normalizeIngredients,
} from "@/modules/builder/helpers";
import { Count } from "@/common/helpers/Count";
import { getIngredientsPrice } from "@/common/helpers";
import { CommitDataMutation } from "@/modules/builder/store/builder-ingredients/constants";

const cacheController = new CacheController();

const initialState = () => ({
  ingredients: cloneDeep(cacheController.items),
});

export default {
  namespaced: true,

  state: initialState(),

  getters: {
    ingredientsPrice(state) {
      return getIngredientsPrice(state.ingredients);
    },
  },

  mutations: {
    // eslint-disable-next-line no-unused-vars
    [RESET_STATE](state) {
      state = Object.assign(state, initialState());
    },

    [SET_INGREDIENTS](state, payload) {
      state.ingredients = payload;
    },

    [INGREDIENT_INC](state, { type, value }) {
      state.ingredients = Count.incDec(type, value, state.ingredients);
    },

    [INGREDIENT_DEC](state, { type, value }) {
      state.ingredients = Count.incDec(type, value, state.ingredients);
    },

    [INGREDIENT_CHANGE](state, { value: valueData }) {
      const { id, value } = valueData;
      state.ingredients = Count.change(id, value, state.ingredients);
    },

    [INGREDIENT_DROP](state, { type, value }) {
      state.ingredients = Count.incDec(type, value, state.ingredients);
    },
  },

  actions: {
    resetState({ commit }) {
      commit(RESET_STATE);
    },

    async fetchIngredients({ commit }, { cache } = { cache: true }) {
      await cacheController.run({
        cache,
        api: () => this.$api.ingredients.get(),
        normalize: normalizeIngredients,
      });

      commit(SET_INGREDIENTS, cloneDeep(cacheController.items));
    },

    setIngredients({ commit }, ingredients) {
      commit(SET_INGREDIENTS, ingredients);
    },

    countChange({ commit, state }, { evtData, ingredientId }) {
      const { evtType, value } = evtData;

      Count.buildCommitMutation(
        { arr: state.ingredients, arrId: ingredientId, evtType, value },
        (commitData) => {
          commit(
            CommitDataMutation[commitData.mutationType],
            commitData.payload
          );
        }
      );
    },
  },
};
