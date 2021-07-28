<template>
  <div class="sign-form">
    <a @click="goBack()" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </a>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from "src/modules/login/components/LoginForm";

export default {
  name: "TheLogin",

  components: {
    LoginForm,
  },

  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>
