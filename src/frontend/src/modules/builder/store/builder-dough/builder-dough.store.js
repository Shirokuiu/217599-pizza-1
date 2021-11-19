import { normalizeDougs } from "@/modules/builder/helpers";
import {
  RESET_STATE,
  SET_DOUGHS,
  CHANGE_DOUGH,
} from "@/modules/builder/store/builder-dough/mutation-types";
import { getChecked } from "@/common/helpers";

let cacheDoughs = [];

export default {
  namespaced: true,

  state: () => ({
    doughs: [],
  }),

  getters: {
    totalPrice(state) {
      return getChecked(state.doughs).price;
    },
  },

  mutations: {
    [RESET_STATE](state, payload) {
      state.doughs = payload;
    },

    [SET_DOUGHS](state, payload) {
      state.doughs = payload;
    },

    [CHANGE_DOUGH](state, id) {
      state.doughs = state.doughs.map((dough) => ({
        ...dough,
        isChecked: dough.id === id,
      }));
    },
  },

  actions: {
    async fetchDoughs({ commit }) {
      if (!cacheDoughs.length) {
        cacheDoughs = normalizeDougs(await this.$api.dough.get());
      }

      commit(SET_DOUGHS, cacheDoughs);
    },

    setDoughs({ commit }, doughs) {
      commit(SET_DOUGHS, doughs);
    },

    changeDough({ commit }, activeDoughId) {
      commit(CHANGE_DOUGH, activeDoughId);
    },

    resetState({ commit }) {
      commit(RESET_STATE, cacheDoughs);
    },
  },
};
