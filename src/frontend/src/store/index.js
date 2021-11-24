import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules/index";
import { vuexPlugins } from "@/plugins";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [vuexPlugins],
  modules,
});
