import CartPizzaList from "@/modules/cart/store/cart-pizza-list/cart-pizza-list.store";
import CartAdditionalList from "@/modules/cart/store/cart-additional-list/cart-additional-list.store";
import CartMakeOrder from "@/modules/cart/store/cart-make-order/cart-make-order.store";
import {
  RESET_STATE,
  SET_EDIT_PIZZA_ID,
  TOGGLE_EDIT,
  TOGGLE_POPUP_SUCCESS,
} from "@/modules/cart/store/cart/mutation-types";
import { buildOrderForBack } from "@/modules/cart/store/cart/helpers";

const initialState = () => ({
  isEdit: false,
  editPizzaId: undefined,
  isSuccessPopupShow: false,
});

export default {
  namespaced: true,

  state: initialState(),

  getters: {
    totalPrice(state, getters, rootState, rootGetters) {
      return (
        rootGetters["Cart/CartPizzaList/totalPrice"] +
        rootGetters["Cart/CartAdditionalList/totalPrice"]
      );
    },
  },

  mutations: {
    // eslint-disable-next-line no-unused-vars
    [RESET_STATE](state) {
      state = Object.assign(state, initialState());
    },

    [SET_EDIT_PIZZA_ID](state, payload) {
      state.editPizzaId = payload;
    },

    [TOGGLE_EDIT](state, payload) {
      state.isEdit = payload;
    },

    [TOGGLE_POPUP_SUCCESS](state, isShow) {
      state.isSuccessPopupShow = isShow;
    },
  },

  actions: {
    resetState({ commit, dispatch }) {
      commit(RESET_STATE);

      dispatch("CartPizzaList/resetState");
      dispatch("CartAdditionalList/resetState");
      dispatch("CartMakeOrder/resetState");
    },

    setEditPizzaId({ commit }, pizzaId) {
      commit(SET_EDIT_PIZZA_ID, pizzaId);
    },

    toggleEdit({ commit }, isEdit) {
      commit(TOGGLE_EDIT, isEdit);
    },

    toggleSuccessPopup({ commit }, isShow) {
      commit(TOGGLE_POPUP_SUCCESS, isShow);
    },

    async makeOrder({ dispatch, rootState, rootGetters }) {
      await dispatch("CartMakeOrder/submit");
      await this.$api.orders.post(
        buildOrderForBack({ rootState, rootGetters })
      );

      dispatch("resetState");
      dispatch("toggleSuccessPopup", true);
    },
  },

  modules: {
    CartPizzaList,
    CartAdditionalList,
    CartMakeOrder,
  },
};
