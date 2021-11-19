<template>
  <form>
    <div class="sign-form__input">
      <AppInput
        v-model="email"
        label="E-mail"
        type="email"
        name="email"
        placeholder="example@mail.ru"
      />
      <span v-if="!$v.email.required && $v.email.$dirty"
        >Поле обязательно для заполнения</span
      >
      <span v-if="$v.email.$dirty && !$v.email.email"
        >Введите корректный email</span
      >
    </div>

    <div class="sign-form__input">
      <AppInput
        v-model="password"
        label="Пароль"
        type="password"
        name="pass"
        placeholder="***********"
      />
      <span v-if="!$v.password.required && $v.password.$dirty"
        >Поле обязательно для заполнения</span
      >
      <span v-if="errorFromBack.hasError">{{ errorFromBack.text }}</span>
    </div>
    <button type="submit" class="button" @click.prevent="onSubmitClick">
      Авторизоваться
    </button>
  </form>
</template>

<script>
import AppInput from "@/common/components/AppInput";
import { required, email } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
  name: "LoginForm",

  components: {
    AppInput,
  },

  data() {
    return {
      email: "",
      password: "",
      errorFromBack: {
        hasError: false,
        text: "",
      },
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

    onSubmitClick() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.login({ email: this.email, password: this.password }).catch(
          (e) => {
            this.errorFromBack = {
              hasError: true,
              text: e.data.error.message,
            };
          }
        );
      }
    },
  },
};
</script>
