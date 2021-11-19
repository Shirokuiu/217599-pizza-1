import {
  DELETE_ORDER,
  SET_ORDERS,
} from "@/modules/orders/store/orders-list/mutation-types";
import { normalizeAdditionals } from "@/common/helpers";
import { mapOrderList } from "@/modules/orders/store/orders-list/helpers";
import router from "@/router";

export default {
  namespaced: true,

  state: () => ({
    orders: [],
  }),

  mutations: {
    [SET_ORDERS](state, orders) {
      state.orders = orders;
    },

    [DELETE_ORDER](state, id) {
      state.orders = state.orders.filter(({ id: orderId }) => orderId !== id);
    },
  },

  actions: {
    async init({ commit, dispatch, rootState }) {
      const orders = await dispatch("fetchOrders");

      const addresses = await this.$api.addresses.get();
      const misc = normalizeAdditionals(await this.$api.misc.get());

      commit(SET_ORDERS, mapOrderList(orders, rootState, addresses, misc));
    },

    async fetchOrders() {
      return await this.$api.orders.get();
    },

    async repeatOrder({ dispatch }, order) {
      const pizzas = order.pizzas;
      const additionals = order.misc;

      await dispatch("Cart/CartPizzaList/repeatOrder", pizzas, {
        root: true,
      });
      await dispatch(
        "Cart/CartAdditionalList/repeatOrderAdditionals",
        additionals,
        {
          root: true,
        }
      );

      router.push("/cart");
    },

    async deleteOrder({ commit }, id) {
      await this.$api.orders.deleteOrder(id);

      commit(DELETE_ORDER, id);
    },
  },
};
