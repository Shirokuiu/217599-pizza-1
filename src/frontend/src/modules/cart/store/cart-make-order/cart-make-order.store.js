import { buildForm } from "@/modules/cart/store/cart-make-order/helpers";
import {
  ADDRESS_CHANGE,
  ADDRESS_UPDATE,
  INIT,
  RESET_STATE,
  SET_VALIDATOR,
} from "@/modules/cart/store/cart-make-order/mutation-types";

const DEFAULT_ADDRESS_ID = -1;

const initialState = () => ({
  forms: [],
  currentId: undefined,
  validator: undefined,
});

export default {
  namespaced: true,

  state: initialState(),

  getters: {
    currentFormAddress(state) {
      return state.forms.find(({ id }) => id === state.currentId);
    },

    currentValidationRule(state, getters) {
      return getters.currentFormAddress?.form.validationRule
        ? getters.currentFormAddress.form.validationRule
        : {};
    },
  },

  mutations: {
    // eslint-disable-next-line no-unused-vars
    [RESET_STATE](state) {
      state = Object.assign(state, initialState());
    },

    [INIT](state, addressesFromBack) {
      state.forms = buildForm(addressesFromBack);
      state.currentId = DEFAULT_ADDRESS_ID;
    },

    [ADDRESS_CHANGE](state, id) {
      state.currentId = id;
    },

    [ADDRESS_UPDATE](state, { key, value, currentIndex }) {
      state.forms[currentIndex].form.address[key].value = value;
    },

    [SET_VALIDATOR](state, validator) {
      state.validator = validator;
    },
  },

  actions: {
    resetState({ commit }) {
      commit(RESET_STATE);
    },

    async init({ commit, dispatch, rootState }, validator) {
      let addressesFromBack;

      if (rootState.Auth.isAuth) {
        addressesFromBack = await dispatch("fetchAddresses");

        addressesFromBack = addressesFromBack.map((address) => ({
          ...address,
          phone: rootState.Auth.user.phone,
        }));
      }

      commit(INIT, addressesFromBack);
      commit(SET_VALIDATOR, validator);
    },

    async fetchAddresses() {
      return await this.$api.addresses.get();
    },

    addressChange({ commit }, id) {
      commit(ADDRESS_CHANGE, id);

      return new Promise((resolve) => {
        resolve();
      });
    },

    addressUpdate({ state, commit }, { key, value }) {
      const currentIndex = state.forms.findIndex(
        ({ id }) => id === state.currentId
      );

      commit(ADDRESS_UPDATE, { key, value, currentIndex });
    },

    setValidator({ commit }, validator) {
      commit(SET_VALIDATOR, validator);
    },

    submit({ state }) {
      state.validator.$touch();

      return new Promise((resolve) => {
        if (!state.validator.$invalid) {
          resolve();
        }
      });
    },
  },
};
