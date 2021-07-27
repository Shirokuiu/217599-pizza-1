import Vue from "vue";
import Vuex from "vuex";
import modules from "src/store/modules";
import { DEC, INC, INC_DEC_INPUT_CHANGE } from "src/store/mutation-types";
import { canIncOrDec, dec, inc, incDecInputChange } from "src/common/helpers";
import { countAction } from "src/common/constants";
import vuexPlugins from "src/plugins/vuexPlugins";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [vuexPlugins],
  modules,
  mutations: {
    [DEC](state, { module, entity, value }) {
      const { currentIndex } = value;

      if (canIncOrDec(countAction.DEC, currentIndex, state[module][entity])) {
        dec(state[module][entity], currentIndex);
      }
    },

    [INC](state, { module, entity, value }) {
      const { currentIndex } = value;

      if (canIncOrDec(countAction.INC, currentIndex, state[module][entity])) {
        inc(state[module][entity], currentIndex);
      }
    },

    [INC_DEC_INPUT_CHANGE](state, { module, entity, value }) {
      const { currentIndex, valueInputData } = value;

      incDecInputChange(state[module][entity], currentIndex, valueInputData);
    },
  },

  actions: {
    countAction({ commit }, { module, entity, actionType, value }) {
      commit(actionType, {
        entity,
        module,
        value,
      });
    },
  },
});
