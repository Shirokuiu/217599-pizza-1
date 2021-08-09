<template>
  <form action="test.html" method="post" @submit.prevent="onSubmit">
    <div class="sign-form__input">
      <label class="input">
        <span>E-mail</span>
        <AppInputText
          type="email"
          name="email"
          placeholder="example@mail.ru"
          v-model="email"
        />
        <span v-if="!$v.email.required && $v.email.$dirty"
          >Поле обязательно для заполнения</span
        >
        <span v-if="$v.email.$dirty && !$v.email.email"
          >Введите корректный email</span
        >
      </label>
    </div>

    <div class="sign-form__input">
      <label class="input">
        <span>Пароль</span>
        <AppInputText
          type="password"
          name="password"
          placeholder="***********"
          v-model="password"
        />
        <span v-if="!$v.password.required && $v.password.$dirty"
          >Поле обязательно для заполнения</span
        >
      </label>
    </div>
    <span v-if="hasLoginError">Логин и/или пароль неверны</span>
    <button type="submit" class="button">Авторизоваться</button>
  </form>
</template>

<script>
import { mapActions } from "vuex";
import { required, email } from "vuelidate/lib/validators";
import AppInputText from "src/common/components/AppInputText";

const LOGIN_ERRORE_CODE = 400;

export default {
  name: "LoginForm",

  components: {
    AppInputText,
  },

  data() {
    return {
      email: "",
      password: "",
      hasLoginError: false,
    };
  },

  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  },

  methods: {
    ...mapActions("Auth", ["login"]),

    async onSubmit() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      try {
        await this.login({
          email: this.email,
          password: this.password,
        });
      } catch (e) {
        const { response } = e;

        if (response.status === LOGIN_ERRORE_CODE) {
          this.hasLoginError = true;
        }
      }
    },
  },
};
</script>
