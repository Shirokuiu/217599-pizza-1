<template>
  <div class="content__diameter">
    <AppWidget title="Выберите размер" class="diameter">
      <label
        v-for="{ value, name, isChecked, id } of sizes"
        :key="id"
        class="diameter__input"
        :class="`diameter__input--${value.name}`"
      >
        <input
          type="radio"
          name="diameter"
          :value="value.multiplier"
          :checked="isChecked"
          @change="onSizeChange(value)"
          class="visually-hidden"
        />
        <span>{{ name }}</span>
      </label>
    </AppWidget>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AppWidget from "src/common/components/AppWidget";

export default {
  name: "BuilderSizeSelector",

  components: {
    AppWidget,
  },

  computed: {
    ...mapState("Builder", ["sizes"]),
  },

  methods: {
    ...mapActions("Builder", ["setCurrentSize"]),

    onSizeChange(currentSize) {
      this.setCurrentSize(currentSize);
    },
  },
};
</script>
