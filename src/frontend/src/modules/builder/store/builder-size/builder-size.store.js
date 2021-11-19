import {
  RESET_STATE,
  CHANGE_SIZE,
  SET_SIZES,
} from "@/modules/builder/store/builder-size/mutation-types";
import { normalizeSizes } from "@/modules/builder/helpers";
import { getChecked } from "@/common/helpers";

let cacheSizes = [];

export default {
  namespaced: true,

  state: () => ({
    sizes: [],
  }),

  getters: {
    currentMultiplier(state) {
      return getChecked(state.sizes).multiplier;
    },
  },

  mutations: {
    [RESET_STATE](state, payload) {
      state.sizes = payload;
    },

    [SET_SIZES](state, payload) {
      state.sizes = payload;
    },

    [CHANGE_SIZE](state, id) {
      state.sizes = state.sizes.map((size) => ({
        ...size,
        isChecked: size.id === id,
      }));
    },
  },

  actions: {
    async fetchSizes({ commit }) {
      if (!cacheSizes.length) {
        cacheSizes = normalizeSizes(await this.$api.sizes.get());
      }

      commit(SET_SIZES, cacheSizes);
    },

    setSizes({ commit }, sizes) {
      commit(SET_SIZES, sizes);
    },

    changeSize({ commit }, id) {
      commit(CHANGE_SIZE, id);
    },

    resetState({ commit }) {
      commit(RESET_STATE, cacheSizes);
    },
  },
};
