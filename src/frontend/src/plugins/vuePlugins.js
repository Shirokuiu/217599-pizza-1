import Vue from "vue";
import { createResources } from "src/services";

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
