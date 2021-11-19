<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img
        :src="`img/${additional.image}`"
        width="39"
        height="60"
        :alt="additional.name"
      />
      <span>{{ additional.name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <AppCounter
        color="orange"
        class="additional-list__counter"
        :count="additional.counter.value"
        :is-disable-minus="disableMinus"
        @onCountEvt="onCountChange($event)"
      />

      <div class="additional-list__price">
        <b>{{ additional.totalPrice }}</b>
      </div>
    </div>
  </li>
</template>

<script>
import AppCounter from "@/common/components/AppCounter";

export default {
  name: "CartAdditionalListItem",

  components: {
    AppCounter,
  },

  props: {
    additional: {
      type: Object,
      required: true,
    },
  },

  computed: {
    disableMinus() {
      return this.additional.counter.maxDec >= this.additional.counter.value;
    },
  },

  methods: {
    onCountChange(countEvt) {
      this.$emit("onCountChange", countEvt);
    },
  },
};
</script>
