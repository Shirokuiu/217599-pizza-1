<template>
  <form action="test.html" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <CartEmpty v-if="!pizzaItems.length" />

        <template v-if="pizzaItems.length">
          <CartList />

          <CartAdditionalList />

          <CartMakeOrder />
        </template>
      </div>
    </main>
    <CartFooter v-if="pizzaItems.length" @onSubmit="onSubmit" />

    <transition name="slide-top" mode="in-out">
      <CartOrderSuccessPopup
        v-if="isSuccessPopupShow"
        @onClose="closePopup"
        @onSubmit="closeAndRedirect"
      />
    </transition>
  </form>
</template>

<script>
import CartEmpty from "@/modules/cart/components/CartEmpty";
import CartList from "@/modules/cart/components/CartPizzaList";
import CartAdditionalList from "@/modules/cart/components/CartAdditionalList";
import CartMakeOrder from "@/modules/cart/components/CartMakeOrder";
import CartFooter from "@/modules/cart/components/CartFooter";
import CartOrderSuccessPopup from "@/modules/cart/components/CartOrderSuccessPopup";
import { mapActions, mapState } from "vuex";

export default {
  name: "TheCart",

  components: {
    CartEmpty,
    CartList,
    CartAdditionalList,
    CartMakeOrder,
    CartFooter,
    CartOrderSuccessPopup,
  },

  computed: {
    ...mapState("Cart/CartPizzaList", ["pizzaItems"]),
    ...mapState("Cart", ["isSuccessPopupShow"]),
    ...mapState("Auth", ["isAuth"]),
  },

  methods: {
    ...mapActions("Cart", ["makeOrder", "toggleSuccessPopup"]),

    closePopup() {
      this.toggleSuccessPopup(false);
    },

    closeAndRedirect() {
      this.toggleSuccessPopup(false);

      if (this.isAuth) {
        this.$router.push("user/orders");

        return;
      }

      this.$router.push("/");
    },

    onSubmit() {
      this.makeOrder();
    },
  },
};
</script>
