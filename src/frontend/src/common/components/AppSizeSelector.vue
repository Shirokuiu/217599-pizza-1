<template>
  <div class="content__diameter">
    <AppWidget :title="title">
      <div class="sheet__content diameter">
        <label
          v-for="size in sizes"
          :key="size.multiplier"
          class="diameter__input"
          :class="`diameter__input--${size.classMod}`"
        >
          <input
            type="radio"
            :name="size.radioName"
            :value="size.classMod"
            class="visually-hidden"
            :checked="size.isChecked"
            @change="onChange(size.id)"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </AppWidget>
  </div>
</template>

<script>
import AppWidget from "@/common/components/AppWidget";

export default {
  name: "BuilderSize",

  components: {
    AppWidget,
  },

  props: {
    sizes: {
      type: Array,
      required: true,
      validation: () => [],
    },
    title: {
      type: String,
      default: "Заголовок",
    },
  },

  methods: {
    onChange(id) {
      this.$emit("onSizeChange", id);
    },
  },
};
</script>
