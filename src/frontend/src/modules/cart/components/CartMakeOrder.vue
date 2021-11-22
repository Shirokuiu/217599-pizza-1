<template>
  <div class="cart__form">
    <div v-if="currentFormAddress" class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <AppSelect
          name="test"
          :selected-id="currentFormAddress.id"
          :options="forms"
          key-option-name="name"
          @onChange="onSelectChange"
        />
      </label>

      <AppInput
        v-model="phone"
        name="tel"
        label="Контактный телефон:"
        placeholder="+7 999-999-99-99"
        :is-disabled="currentFormAddress.form.address.phone.isDisabled"
        class="input input--big-label"
      />

      <div v-if="isAddressShow" class="cart-form__address">
        <span class="cart-form__label">{{ currentFormAddress.name }}</span>

        <div class="cart-form__input">
          <AppInput
            v-model="street"
            name="street"
            label="Улица*"
            placeholder=""
            :is-disabled="currentFormAddress.form.address.street.isDisabled"
          />
          <span v-if="!$v.street.required && $v.street.$dirty"
            >Поле обязательно для заполнения</span
          >
        </div>

        <div class="cart-form__input cart-form__input--small">
          <AppInput
            v-model="building"
            name="house"
            label="Дом*"
            placeholder=""
            :is-disabled="currentFormAddress.form.address.building.isDisabled"
          />
          <span v-if="!$v.building.required && $v.building.$dirty"
            >Поле обязательно для заполнения</span
          >
        </div>

        <div class="cart-form__input cart-form__input--small">
          <AppInput
            v-model="flat"
            name="apartment"
            label="Квартира"
            placeholder=""
            :is-disabled="currentFormAddress.form.address.flat.isDisabled"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppSelect from "@/common/components/AppSelect";
import { mapActions, mapGetters, mapState } from "vuex";
import AppInput from "@/common/components/AppInput";

export default {
  name: "CartMakeOrder",

  components: {
    AppSelect,
    AppInput,
  },

  computed: {
    ...mapGetters("Cart/CartMakeOrder", [
      "currentFormAddress",
      "currentValidationRule",
    ]),
    ...mapState("Cart/CartMakeOrder", ["forms"]),

    isAddressShow() {
      return this.currentFormAddress.form.address.street?.value.length >= 0;
    },

    phone: {
      get() {
        return this.currentFormAddress.form.address.phone.value;
      },

      set(value) {
        this.addressUpdate({ key: "phone", value });
      },
    },

    street: {
      get() {
        return this.currentFormAddress.form.address.street?.value;
      },

      set(value) {
        this.addressUpdate({ key: "street", value });
        this.$v.street.$touch();
      },
    },

    building: {
      get() {
        return this.currentFormAddress.form.address.building?.value;
      },

      set(value) {
        this.addressUpdate({ key: "building", value });
        this.$v.building.$touch();
      },
    },

    flat: {
      get() {
        return this.currentFormAddress.form.address.flat?.value;
      },

      set(value) {
        this.addressUpdate({ key: "flat", value });
      },
    },
  },

  validations() {
    return this.currentValidationRule;
  },

  created() {
    this.init(this.$v);
  },

  methods: {
    ...mapActions("Cart/CartMakeOrder", [
      "init",
      "addressChange",
      "addressUpdate",
      "setValidator",
    ]),

    async onSelectChange(evt) {
      await this.addressChange(evt.id);

      this.setValidator(this.$v);
    },
  },
};
</script>
