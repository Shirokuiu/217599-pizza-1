<template>
  <div class="content__dough">
    <AppWidget :title="title">
      <div class="sheet__content dough">
        <label
          v-for="dough in doughs"
          class="dough__input"
          :class="`dough__input--${dough.classMod}`"
          :key="dough.id"
        >
          <input
            type="radio"
            :name="dough.radioName"
            class="visually-hidden"
            :value="dough.classMod"
            :checked="dough.isChecked"
            @change="onDoughChange(dough.id)"
          />
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </label>
      </div>
    </AppWidget>
  </div>
</template>

<script>
import AppWidget from "@/common/components/AppWidget";

export default {
  name: "AppDoughSelector",

  components: {
    AppWidget,
  },

  props: {
    title: {
      type: String,
      default: "Заголовок",
    },
    doughs: {
      type: Array,
      required: true,
      validation: () => [],
    },
  },

  methods: {
    onDoughChange(id) {
      this.$emit("onDoughChange", id);
    },
  },
};
</script>
