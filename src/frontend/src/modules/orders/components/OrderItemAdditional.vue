<template>
  <ul class="order__additional">
    <li>
      <img
        src="../../../assets/img/cola.svg"
        width="20"
        height="30"
        alt="Coca-Cola 0,5 литра"
      />
      <p>
        <span>Coca-Cola 0,5 литра</span>
        <b>56 ₽</b>
      </p>
    </li>
    <li>
      <img
        src="../../../assets/img/sauce.svg"
        width="20"
        height="30"
        alt="Острый соус"
      />
      <span>Острый соус <br />30 ₽</span>
    </li>
    <li>
      <img
        src="../../../assets/img/potato.svg"
        width="20"
        height="30"
        alt="Картошка из печи"
      />
      <p>
        <span>Картошка из печи</span>
        <b>170 ₽</b>
      </p>
    </li>
  </ul>
</template>

<script>
export default {
  name: "OrderItemAdditional",
};
</script>
