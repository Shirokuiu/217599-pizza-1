import { createResources } from "@/common/helpers";

export const vuexPlugins = (store) => {
  store.$api = createResources();
};
