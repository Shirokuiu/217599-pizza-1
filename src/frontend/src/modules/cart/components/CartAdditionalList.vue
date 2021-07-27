<template>
  <ul class="additional-list">
    <CartAdditionalItem
      v-for="(additional, idx) of additionalItems"
      :key="additional.id"
      :additional-item="additional"
      @onCountUpdate="
        onCountUpdate($event, idx, 'Cart', 'additionalItems', countAction)
      "
    />
  </ul>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CartAdditionalItem from "src/modules/cart/components/CartAddtionalItem";
import { onCountUpdate } from "src/common/helpers";

export default {
  name: "CartAdditionalList",

  components: {
    CartAdditionalItem,
  },

  computed: {
    ...mapState("Cart", ["additionalItems"]),
  },

  created() {
    this.getMisc();
  },

  methods: {
    ...mapActions(["countAction"]),
    ...mapActions("Cart", ["getMisc"]),

    onCountUpdate(countActionData, currentIndex, module, entity, action) {
      onCountUpdate(countActionData, currentIndex, module, entity, action);
    },
  },
};
</script>
