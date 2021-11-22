<template>
  <div>
    <div class="layout__address">
      <div class="sheet address-form">
        <div class="address-form__header">
          <b>Адрес №{{ addressNumber }}. {{ address.name.value }}</b>
          <div class="address-form__edit">
            <button @click="onEditClick" type="button" class="icon">
              <span class="visually-hidden">Изменить адрес</span>
            </button>
          </div>
        </div>
        <p>
          {{ address.street.value }}, д. {{ address.building.value }}, оф.
          {{ address.flat.value }}
        </p>
        <small>{{ address.comment.value }}</small>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ProfileAddressItem",

  props: {
    address: {
      type: Object,
      required: true,
    },
    addressNumber: {
      type: Number,
      default: 1,
    },
  },

  data() {
    return {
      needClose: false,
    };
  },

  methods: {
    onEditClick() {
      this.$emit("onEdit", this.address.id);
    },
  },
};
</script>
