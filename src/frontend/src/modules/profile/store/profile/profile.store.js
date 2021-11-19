import ProfileAddressList from "@/modules/profile/store/profile-address-list/profile-address-list.store";
import { SET_ADDRESS_FORM } from "@/modules/profile/store/profile/mutation-types";
import { buildNewAddressForm } from "@/modules/profile/helpers";

export default {
  namespaced: true,

  state: () => ({
    addressForm: {},
  }),

  mutations: {
    [SET_ADDRESS_FORM](state, form) {
      state.addressForm = form;
    },
  },

  actions: {
    buildAddressForm({ commit }) {
      commit(SET_ADDRESS_FORM, buildNewAddressForm());
    },

    async addNewAddress({ dispatch, rootState }, formData) {
      const userId = rootState.Auth.user.id;

      const newAddress = await this.$api.addresses.post({
        ...formData,
        userId,
      });

      dispatch("ProfileAddressList/addAddress", newAddress);

      return new Promise((resolve) => {
        resolve();
      });
    },
  },

  modules: {
    ProfileAddressList,
  },
};
