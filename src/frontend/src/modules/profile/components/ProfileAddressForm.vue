<template>
  <div class="layout__address">
    <form class="address-form address-form--opened sheet">
      <div class="address-form__header">
        <slot></slot>
      </div>

      <div class="address-form__wrapper">
        <div class="address-form__input">
          <AppInput
            v-model="name"
            :name="form.name.name"
            :label="form.name.label"
            :placeholder="form.name.placeholder"
          />
          <span v-if="!$v.name.required && $v.name.$dirty">{{
            form.name.errorText
          }}</span>
        </div>
        <div class="address-form__input address-form__input--size--normal">
          <AppInput
            v-model="street"
            :name="form.street.name"
            :label="form.street.label"
            :placeholder="form.street.placeholder"
          />
          <span v-if="!$v.street.required && $v.street.$dirty">{{
            form.street.errorText
          }}</span>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <AppInput
            v-model="building"
            :name="form.building.name"
            :label="form.building.label"
            :placeholder="form.building.placeholder"
          />
          <span v-if="!$v.building.required && $v.building.$dirty">{{
            form.building.errorText
          }}</span>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <AppInput
            v-model="formValues.flat"
            :name="form.flat.name"
            :label="form.flat.label"
            :placeholder="form.flat.placeholder"
          />
        </div>
        <div class="address-form__input">
          <AppInput
            v-model="formValues.comment"
            :name="form.flat.name"
            :label="form.flat.label"
            :placeholder="form.flat.placeholder"
          />
        </div>
      </div>

      <div class="address-form__buttons">
        <AppBtn
          v-for="btn in buttons"
          :key="btn.id"
          :class="{ 'button--transparent': !btn.isForward }"
          :description="btn.name"
          @onBtnClick="onBtnClick(btn.actionType)"
        />
      </div>
    </form>
  </div>
</template>

<script>
import AppBtn from "@/common/components/AppBtn";
import AppInput from "@/common/components/AppInput";
import { BtnActions, btns } from "@/modules/profile/constants";
import { required } from "vuelidate/lib/validators";

export default {
  name: "ProfileAddressForm",

  components: { AppBtn, AppInput },

  props: {
    form: {
      type: Object,
      default: () => {},
    },

    actions: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      formValues: { ...this.buildDataValues(this.form) },
      BtnActions,
    };
  },

  computed: {
    buttons() {
      return btns.filter(({ actionType }) => this.actions.includes(actionType));
    },

    name: {
      get() {
        return this.formValues.name;
      },

      set(value) {
        this.formValues.name = value;
        this.$v.name.$touch();
      },
    },

    street: {
      get() {
        return this.formValues.street;
      },

      set(value) {
        this.formValues.street = value;
        this.$v.street.$touch();
      },
    },

    building: {
      get() {
        return this.formValues.building;
      },

      set(value) {
        this.formValues.building = value;
        this.$v.building.$touch();
      },
    },
  },

  validations() {
    return { ...this.buildValidations(this.form) };
  },

  methods: {
    onBtnClick(action) {
      switch (action) {
        case BtnActions.Save:
          this.$v.$touch();

          if (!this.$v.$invalid) {
            this.$emit("action", { action, data: this.formValues });
          }
          return;
      }

      this.$emit("action", { action });
    },

    buildDataValues(form) {
      return Object.keys({ ...form })
        .filter((it) => !["id", "isEdit"].includes(it))
        .reduce((obj, v) => {
          obj[v] = form[v].value;

          return obj;
        }, {});
    },

    buildValidations(form) {
      return Object.keys({ ...form })
        .filter((item) => form[item].isRequired)
        .reduce((obj, v) => {
          obj[v] = {
            required,
          };

          return obj;
        }, {});
    },
  },
};
</script>
