<template>
  <div>
    <ProfileAddressItem
      v-for="(address, idx) in addresses"
      :key="address.id"
      :address="address"
      :address-number="idx + 1"
      @onEdit="onToggleEdit"
    >
      <ProfileAddressForm
        v-if="address.isEdit"
        :form="currentAddress"
        :actions="[BtnActions.Delete, BtnActions.Save]"
        @action="onActionForm($event, address.id)"
      >
        <b>Адрес №{{ idx + 1 }}</b>
      </ProfileAddressForm>
    </ProfileAddressItem>
  </div>
</template>

<script>
import ProfileAddressItem from "@/modules/profile/components/ProfileAddressItem";
import { mapActions, mapGetters, mapState } from "vuex";
import ProfileAddressForm from "@/modules/profile/components/ProfileAddressForm";
import { BtnActions } from "@/modules/profile/constants";

export default {
  name: "ProfileAddressList",

  components: {
    ProfileAddressItem,
    ProfileAddressForm,
  },

  data() {
    return {
      BtnActions,
    };
  },

  computed: {
    ...mapState("Profile/ProfileAddressList", ["addresses"]),
    ...mapGetters("Profile/ProfileAddressList", ["currentAddress"]),
  },

  created() {
    this.fetchAddresses();
  },

  methods: {
    ...mapActions("Profile/ProfileAddressList", [
      "fetchAddresses",
      "setCurrentAddressId",
      "toggleEdit",
      "deleteAddress",
      "editAddress",
    ]),

    onToggleEdit(id) {
      this.setCurrentAddressId(id);
      this.toggleEdit(id);
    },

    removeAddress(id) {
      this.deleteAddress(id);
    },

    onActionForm({ action, data }, id) {
      switch (action) {
        case BtnActions.Save:
          this.editAddress(data);
          break;
        case BtnActions.Delete:
          this.removeAddress(id);
          break;
      }
    },
  },
};
</script>
