<template>
  <div class="popup">
    <a @click="onCLoseClick" class="close">
      <span class="visually-hidden">Закрыть попап</span>
    </a>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <a @click="onSubmitClick" class="button">Отлично, я жду!</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartOrderSuccessPopup",

  methods: {
    onCLoseClick() {
      this.$emit("onClose");
    },

    onSubmitClick() {
      this.$emit("onSubmit");
    },
  },
};
</script>
