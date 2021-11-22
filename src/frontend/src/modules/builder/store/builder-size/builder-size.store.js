import {
  RESET_STATE,
  CHANGE_SIZE,
  SET_SIZES,
} from "@/modules/builder/store/builder-size/mutation-types";
import { CacheController } from "@/modules/builder/helpers";
import { getChecked } from "@/common/helpers";
import { normalize } from "@/modules/builder/store/builder-size/helpers/normalize";

const cacheController = new CacheController();

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
    async fetchSizes({ commit }, { cache } = { cache: true }) {
      await cacheController.run({
        api: () => this.$api.sizes.get(),
        normalize,
        cache,
      });

      commit(SET_SIZES, cacheController.items);
    },

    setSizes({ commit }, sizes) {
      commit(SET_SIZES, sizes);
    },

    changeSize({ commit }, id) {
      commit(CHANGE_SIZE, id);
    },

    resetState({ commit }) {
      commit(RESET_STATE, cacheController.items);
    },
  },
};
