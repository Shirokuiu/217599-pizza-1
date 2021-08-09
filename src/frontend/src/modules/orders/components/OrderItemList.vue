<template>
  <ul class="order__list">
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
          <h2>Моя любимая</h2>
          <ul>
            <li>30 см, на тонком тесте</li>
            <li>Соус: томатный</li>
            <li>Начинка: грибы, лук, ветчина, пармезан, ананас</li>
          </ul>
        </div>
      </div>

      <p class="order__price">2х782 ₽</p>
    </li>
  </ul>
</template>

<script>
export default {
  name: "OrderItemList",
};
</script>
