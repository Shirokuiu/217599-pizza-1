import {
  SET_USER,
  TOGGLE_IS_AUTH,
} from "src/store/modules/login/mutation-types";
import JWTService from "src/services/JWTService";
import router from "src/router";

const initialState = () => {
  return {
    isAuth: false,
    user: undefined,
  };
};

export default {
  namespaced: true,

  state: initialState(),

  mutations: {
    [TOGGLE_IS_AUTH](state, isAuth) {
      state.isAuth = isAuth;
    },

    [SET_USER](state, currentUser) {
      state.user = currentUser;
    },
  },

  actions: {
    async login({ dispatch }, body) {
      try {
        const { token } = await this.$api.auth.login(body);

        JWTService.saveToken(token);
        this.$api.auth.setAuthHeader();
        dispatch("toggleIsAuth", true);
        dispatch("getMe");
        router.push("/");
      } catch (e) {
        return Promise.reject(e);
      }
    },

    async logout({ dispatch, commit }) {
      try {
        await this.$api.auth.logout();
        JWTService.destroyToken();
        this.$api.auth.setAuthHeader();
        dispatch("toggleIsAuth", false);
        commit(SET_USER, undefined);
      } catch (e) {
        return Promise.reject(e);
      }
    },

    async toggleIsAuth({ commit }, isAuth) {
      commit(TOGGLE_IS_AUTH, isAuth);
    },

    async getMe({ commit }) {
      try {
        const currentUser = await this.$api.auth.getMe();

        commit(SET_USER, currentUser);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
