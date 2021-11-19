<template>
  <div class="counter">
    <button
      :class="{ 'counter__button--disabled': isDisableMinus }"
      :disabled="isDisableMinus"
      @click="onCountEvt(CountEvent.DEC, count)"
      type="button"
      class="counter__button counter__button--minus"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      :value="count"
      @change="onCountEvt(CountEvent.CHANGE, $refs.input.value)"
      type="text"
      name="counter"
      class="counter__input"
      ref="input"
    />
    <button
      :disabled="isDisablePlus"
      :class="[
        isDisablePlus ? 'counter__button--disabled' : undefined,
        color ? `counter__button--${color}` : undefined,
      ]"
      @click="onCountEvt(CountEvent.INC, count)"
      type="button"
      class="counter__button counter__button--plus"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
import { CountEvents } from "@/common/constants";

const colorMods = {
  none: undefined,
  orange: "orange",
};

export default {
  name: "AppCounter",

  props: {
    count: {
      type: [Number, String],
      default: 0,
    },
    isDisablePlus: {
      type: Boolean,
      default: false,
    },
    isDisableMinus: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: colorMods.none,
      validation: (color) => colorMods[color],
    },
  },

  data() {
    return {
      CountEvent: Object.freeze(CountEvents),
    };
  },

  methods: {
    onCountEvt(evtType, value) {
      this.$emit("onCountEvt", { evtType, value });

      // NOTE Если этого не сделать, то vue не перерендерит this.count,
      // потому что родитель при валидации может выставить предыдущее значение,
      // предыдущее значение может не изменить пропс,
      // в следствии чего не будет перерендера
      this.$forceUpdate();
    },
  },
};
</script>
