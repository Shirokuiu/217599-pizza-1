<template>
  <div class="sign-form">
    <a @click="onCLoseClick" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </a>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from "@/modules/login/components/LoginForm";
import router from "@/router";

export default {
  name: "Login",

  components: {
    LoginForm,
  },

  methods: {
    onCLoseClick() {
      router.back();
    },
  },
};
</script>
