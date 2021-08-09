<template>
  <form class="cart-form">
    <label class="cart-form__select">
      <span class="cart-form__label">Получение заказа:</span>

      <AppSelect
        name="comment"
        :options="comments"
        @selectChange="selectComment"
      />
    </label>

    <label class="input input--big-label">
      <span>Контактный телефон:</span>
      <AppInputText placeholder="+7 999-999-99-99" name="tel" />
    </label>

    <div class="cart-form__address" v-if="isAdvancedForm">
      <span class="cart-form__label">Новый адрес:</span>

      <div class="cart-form__input">
        <label class="input">
          <span>Улица*</span>
          <AppInputText placeholder="" name="street" v-model="street" />
          <span v-if="!$v.street.required && $v.street.$dirty"
            >Обязательно для заполнения</span
          >
        </label>
      </div>

      <div class="cart-form__input cart-form__input--small">
        <label class="input">
          <span>Дом*</span>
          <AppInputText placeholder="" name="house" v-model="building" />
          <span v-if="!$v.building.required && $v.building.$dirty"
            >Обязательно для заполнения</span
          >
        </label>
      </div>

      <div class="cart-form__input cart-form__input--small">
        <label class="input">
          <span>Квартира*</span>
          <AppInputText placeholder="" name="apartment" v-model="flat" />
          <span v-if="!$v.flat.required && $v.flat.$dirty"
            >Обязательно для заполнения</span
          >
        </label>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required } from "vuelidate/lib/validators";
import AppInputText from "src/common/components/AppInputText";
import AppSelect from "src/common/components/AppSelect";

export default {
  name: "CartContentForm",

  components: {
    AppInputText,
    AppSelect,
  },

  data() {
    return {
      comments: [],
      comment: "",
      tel: "",
      street: "",
      building: "",
      flat: "",
    };
  },

  validations() {
    return this.makeValidators();
  },

  computed: {
    ...mapState("Auth", ["isAuth"]),

    isAdvancedForm() {
      return [this.comments[1].value].includes(this.comment);
    },
  },

  created() {
    this.comments = this.makeComments();
    this.comment = this.comments[0].value;
    this.setForm(this.$v);
  },

  methods: {
    ...mapActions("Cart", ["setForm"]),

    selectComment(comment) {
      this.comment = comment;

      this.setForm(this.$v);

      this.$v.comment?.$touch();
    },

    makeComments() {
      return [
        {
          id: 1,
          value: "Получу сам",
          name: "Получу сам",
        },
        {
          id: 2,
          value: "Новый адрес",
          name: "Новый адрес",
        },
        (() => {
          if (this.isAuth) {
            return {
              id: 3,
              value: "Существующий адрес",
              name: "Существующий адрес",
            };
          }
        })(),
      ].filter((item) => item);
    },

    makeValidators() {
      if (!this.isAdvancedForm) {
        return {
          comment: {
            required,
          },
        };
      }

      return {
        comment: {
          required,
        },

        street: {
          required,
        },

        building: {
          required,
        },

        flat: {
          required,
        },
      };
    },
  },
};
</script>
