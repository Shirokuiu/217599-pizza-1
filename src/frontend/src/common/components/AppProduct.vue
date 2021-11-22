<template>
  <div class="product cart-list__product">
    <img
      src="~@/assets/img/product.svg"
      class="product__img"
      width="56"
      height="56"
      :alt="productName"
    />
    <div class="product__text">
      <h2>{{ productName }}</h2>
      <ul>
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppProduct",

  props: {
    productName: {
      type: String,
      default: "Продукт",
    },
  },
};
</script>
