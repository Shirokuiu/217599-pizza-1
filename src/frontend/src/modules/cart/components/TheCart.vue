<template>
  <form action="test.html" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <CartContentEmpty v-if="!cartItems.length"></CartContentEmpty>

        <CartContent v-if="cartItems.length" />
      </div>
    </main>
    <CartFooter v-if="cartItems.length" @submitOrder="submit" />
    <CartSuccessPopup v-if="isSuccessPopupShow" @close="closeSuccessPopup" />
  </form>
</template>

<script>
import { mapState, mapActions } from "vuex";
import router from "src/router";
import CartContent from "src/modules/cart/components/CartContent";
import CartFooter from "src/modules/cart/components/CartFooter";
import CartContentEmpty from "src/modules/cart/components/CartContentEmpty";
import CartSuccessPopup from "src/modules/cart/components/CartSuccessPopup";

const ORDER_PATH = "/orders";
const MAIN_PATH = "/";

export default {
  name: "TheCart",

  components: {
    CartContent,
    CartFooter,
    CartContentEmpty,
    CartSuccessPopup,
  },

  data() {
    return {
      isSuccessPopupShow: false,
    };
  },

  computed: {
    ...mapState("Cart", ["cartItems"]),
    ...mapState("Auth", ["isAuth"]),
  },

  methods: {
    ...mapActions("Cart", ["submitOrder", "resetState"]),

    async submit() {
      try {
        await this.submitOrder();

        this.openSuccessPopup();
      } catch (e) {
        //
      }
    },

    openSuccessPopup() {
      this.isSuccessPopupShow = true;
    },

    closeSuccessPopup() {
      const route = this.isAuth ? ORDER_PATH : MAIN_PATH;

      this.resetState();
      router.push(route);
    },
  },
};
</script>
