import {
  ADD_ADDRESS,
  SET_ADDRESSES,
  SET_CURRENT_ADDRESS_ID,
  DELETE_ADDRESS,
  TOGGLE_EDIT,
  EDIT_ADDRESS,
} from "@/modules/profile/store/profile-address-list/mutation-types";
import {
  patchFormValues,
  buildFormAddresses,
} from "@/modules/profile/store/profile-address-list/helpers";
import { SET_SAVED_OLD_ADDRESS_ID } from "@/modules/profile/store/profile/mutation-types";

export default {
  namespaced: true,

  state: () => ({
    addresses: [],
    currentAddressId: undefined,
    //NOTE: Для того чтобы переключать режимы редактирования на одной кнопке
    savedOldAddressId: undefined,
  }),

  getters: {
    currentAddress(state) {
      return state.addresses.find(({ id }) => id === state.currentAddressId);
    },
  },

  mutations: {
    [SET_ADDRESSES](state, addresses) {
      state.addresses = addresses;
    },

    [SET_SAVED_OLD_ADDRESS_ID](state, savedId) {
      state.savedOldAddressId = savedId;
    },

    [ADD_ADDRESS](state, newAddress) {
      state.addresses = [...state.addresses, ...newAddress];
    },

    [EDIT_ADDRESS](state, { id, editedAddress }) {
      const idx = state.addresses.findIndex(
        ({ id: addressId }) => addressId === id
      );
      const res = state.addresses.slice();

      res[idx] = {
        ...res[idx],
        ...patchFormValues(editedAddress, res[idx]),
      };

      state.addresses = res;
    },

    [SET_CURRENT_ADDRESS_ID](state, id) {
      state.currentAddressId = id;
    },

    [TOGGLE_EDIT](state, { id, needClose }) {
      state.addresses = state.addresses.map((address) => ({
        ...address,
        isEdit: needClose ? false : address.id === id,
      }));
    },

    [DELETE_ADDRESS](state, id) {
      state.addresses = state.addresses
        .map((address) => ({
          ...address,
          isEdit: false,
        }))
        .filter((address) => address.id !== id);
    },
  },

  actions: {
    async fetchAddresses({ commit }) {
      const addresses = await this.$api.addresses.get();

      commit(SET_ADDRESSES, buildFormAddresses(addresses));
    },

    addAddress({ commit }, newAddress) {
      commit(ADD_ADDRESS, buildFormAddresses([newAddress]));
    },

    async editAddress({ commit, dispatch, getters, rootState }, editedAddress) {
      const id = getters.currentAddress.id;
      const userId = rootState.Auth.user.id;

      await this.$api.addresses.edit(id, { ...editedAddress, userId });

      commit(EDIT_ADDRESS, { id, editedAddress });
      dispatch("toggleEdit", id);
    },

    setCurrentAddressId({ commit }, id) {
      commit(SET_CURRENT_ADDRESS_ID, id);
    },

    toggleEdit({ commit, dispatch, state }, id) {
      //NOTE: Для того чтобы переключать режимы редактирования на одной кнопке
      const { savedOldAddressId } = state;
      const needClose = savedOldAddressId === id;
      const savedId = savedOldAddressId === id ? undefined : id;

      dispatch("setSavedOldAddressId", savedId);
      commit(TOGGLE_EDIT, { id, needClose });
    },

    setSavedOldAddressId({ commit }, savedId) {
      commit(SET_SAVED_OLD_ADDRESS_ID, savedId);
    },

    async deleteAddress({ commit }, id) {
      await this.$api.addresses.deleteAddress(id);

      commit(DELETE_ADDRESS, id);
    },
  },
};
