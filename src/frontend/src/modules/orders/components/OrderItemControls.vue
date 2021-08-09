<template>
  <div class="order__wrapper">
    <div class="order__number">
      <b>Заказ #11199929</b>
    </div>

    <div class="order__sum">
      <span>Сумма заказа: 1 564 ₽</span>
    </div>

    <div class="order__button">
      <AppBtn text="Удалить" class="button--border" />

      <!--      <button type="button" class="button button&#45;&#45;border">Удалить</button>-->
    </div>
    <div class="order__button">
      <AppBtn text="Повторить" />

      <!--      <button type="button" class="button">Повторить</button>-->
    </div>
  </div>
</template>

<script>
import AppBtn from "src/common/components/AppBtn";

export default {
  name: "OrderItemControls",

  components: {
    AppBtn,
  },
};
</script>
