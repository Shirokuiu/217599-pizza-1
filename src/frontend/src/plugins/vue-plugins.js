import Vue from "vue";
import { createResources } from "@/common/helpers";

const plugins = {
  install(Vue) {
    Vue.mixin({
      computed: {
        $api() {
          return createResources();
        },
      },
    });
  },
};

Vue.use(plugins);
