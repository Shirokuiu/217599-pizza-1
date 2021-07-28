<template>
  <form action="test.html" method="post">
    <div class="sign-form__input">
      <label class="input">
        <span>E-mail</span>
        <input type="email" name="email" placeholder="example@mail.ru" />
      </label>
    </div>

    <div class="sign-form__input">
      <label class="input">
        <span>Пароль</span>
        <input type="password" name="pass" placeholder="***********" />
      </label>
    </div>
    <button type="submit" class="button">Авторизоваться</button>
  </form>
</template>

<script>
export default {
  name: "LoginForm",
};
</script>
