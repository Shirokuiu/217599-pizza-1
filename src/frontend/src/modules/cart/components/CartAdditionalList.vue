<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <CartAdditionalListItem
        v-for="additional in additionals"
        :key="additional.id"
        :additional="additional"
        @onCountChange="onCountChange($event, additional.id)"
      />
    </ul>
  </div>
</template>

<script>
import CartAdditionalListItem from "@/modules/cart/components/CartAdditionalListItem";
import { mapActions, mapState } from "vuex";

export default {
  name: "CartAdditionalLIst",

  components: {
    CartAdditionalListItem,
  },

  computed: {
    ...mapState("Cart/CartAdditionalList", ["additionals"]),
  },

  created() {
    this.fetchAdditionals();
  },

  methods: {
    ...mapActions("Cart/CartAdditionalList", [
      "fetchAdditionals",
      "countChange",
    ]),

    onCountChange(evtData, additionalId) {
      this.countChange({ evtData, additionalId });
    },
  },
};
</script>
