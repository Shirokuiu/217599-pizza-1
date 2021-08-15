<template>
  <li class="order__item">
    <div class="product">
      <img
        src="../../../assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        alt="Капричоза"
      />
      <div class="product__text">
        <h2>Капричоза</h2>
        <ul>
          <li>30 см, на тонком тесте</li>
          <li>Соус: томатный</li>
          <li>
            Начинка: грибы, лук, ветчина, пармезан, ананас, бекон, блю чиз
          </li>
        </ul>
      </div>
    </div>

    <p class="order__price">782 ₽</p>
  </li>
</template>

<script>
export default {
  name: "OrderPizzaItem",
};
</script>
