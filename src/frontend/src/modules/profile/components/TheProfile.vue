<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    <ProfileUser />

    <ProfileAddressList />

    <ProfileAddressForm
      v-if="isFormShow"
      :form="addressForm"
      :actions="[BtnActions.Cancel, BtnActions.Save]"
      @action="onActionForm"
    >
      <b>Адрес №{{ addresses.length + 1 }}</b>
    </ProfileAddressForm>

    <div class="layout__button">
      <AppBtn
        description="Добавить новый адрес"
        class="button--border"
        @onBtnClick="openForm"
      ></AppBtn>
    </div>
  </div>
</template>

<script>
import ProfileUser from "@/modules/profile/components/ProfileUser";
import AppBtn from "@/common/components/AppBtn";
import ProfileAddressList from "@/modules/profile/components/ProfileAddressList";
import ProfileAddressForm from "@/modules/profile/components/ProfileAddressForm";
import { mapActions, mapState } from "vuex";
import { BtnActions } from "@/modules/profile/constants";

export default {
  name: "TheProfile",

  components: {
    ProfileUser,
    AppBtn,
    ProfileAddressForm,
    ProfileAddressList,
  },

  data() {
    return {
      isFormShow: false,
      BtnActions,
    };
  },

  computed: {
    ...mapState("Profile", ["addressForm"]),
    ...mapState("Profile/ProfileAddressList", ["addresses"]),
  },

  created() {
    this.buildAddressForm();
  },

  methods: {
    ...mapActions("Profile", ["addNewAddress", "buildAddressForm"]),

    onActionForm({ action, data }) {
      switch (action) {
        case BtnActions.Save:
          this.addNewAddress(data).then(() => {
            this.closeForm();
          });
          break;
        case BtnActions.Cancel:
          this.closeForm();
          break;
      }
    },

    openForm() {
      this.isFormShow = true;
    },

    closeForm() {
      this.isFormShow = false;
    },
  },
};
</script>
