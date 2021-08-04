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
      <button type="button" class="button" @click="$emit('submitOrder')">
        Оформить заказ
      </button>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { numberWithSpace } from "src/common/helpers";

export default {
  name: "CartFooter",

  computed: {
    ...mapGetters("Cart", ["totalPriceCart"]),

    normalizedTotalPriceCart() {
      return numberWithSpace(this.totalPriceCart);
    },
  },
};
</script>
