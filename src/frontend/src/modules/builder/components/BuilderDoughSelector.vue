<template>
  <div class="content__dough">
    <AppWidget title="Выберите тесто" class="dough">
      <label
        v-for="{ value, name, description, isChecked, id } of doughs"
        :key="id"
        class="dough__input"
        :class="`dough__input--${value.name}`"
      >
        <input
          type="radio"
          name="dough"
          :value="value.price"
          class="visually-hidden"
          :checked="isChecked"
          @change="onDoughChange(value)"
        />
        <b>{{ name }}</b>
        <span>{{ description }}</span>
      </label>
    </AppWidget>
  </div>
</template>

<script>
import AppWidget from "src/common/components/AppWidget";
import { mapActions, mapState } from "vuex";

export default {
  name: "BuilderDoughSelector",

  components: {
    AppWidget,
  },

  computed: {
    ...mapState("Builder", ["doughs"]),
  },

  created() {
    this.getDoughs();
  },

  methods: {
    ...mapActions("Builder", ["setCurrentDough", "getDoughs"]),

    onDoughChange(currentDough) {
      this.setCurrentDough(currentDough);
    },
  },
};
</script>
