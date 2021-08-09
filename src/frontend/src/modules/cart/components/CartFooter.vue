<template>
  <section class="footer">
    <div class="footer__more">
      <router-link to="/" class="button button--border button--arrow"
        >Хочу еще одну</router-link
      >
    </div>
    <p class="footer__text">
      Перейти к конструктору<br />чтоб собрать ещё одну пиццу
    </p>
    <div class="footer__price">
      <b>Итого: {{ normalizedTotalPriceCart }} ₽</b>
    </div>

    <div class="footer__submit">
      <AppBtn text="Оформить заказ" @onCLickBtn="$emit('submitOrder')" />
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { numberWithSpace } from "src/common/helpers";
import AppBtn from "src/common/components/AppBtn";

export default {
  name: "CartFooter",

  components: {
    AppBtn,
  },

  computed: {
    ...mapGetters("Cart", ["totalPriceCart"]),

    normalizedTotalPriceCart() {
      return numberWithSpace(this.totalPriceCart);
    },
  },
};
</script>
