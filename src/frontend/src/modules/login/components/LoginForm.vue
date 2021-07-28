<template>
  <form action="test.html" method="post">
    <div class="sign-form__input">
      <label class="input">
        <span>E-mail</span>
        <AppInputText
          :value="email"
          type="email"
          name="email"
          placeholder="example@mail.ru"
        />
      </label>
    </div>

    <div class="sign-form__input">
      <label class="input">
        <span>Пароль</span>
        <AppInputText
          :value="password"
          type="password"
          name="password"
          placeholder="***********"
        />
      </label>
    </div>
    <button type="submit" class="button">Авторизоваться</button>
  </form>
</template>

<script>
import AppInputText from "src/common/components/AppInputText";

export default {
  name: "LoginForm",

  components: {
    AppInputText,
  },

  data() {
    return {
      email: "",
      password: "",
    };
  },
};
</script>
