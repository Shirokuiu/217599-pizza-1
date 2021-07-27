import { createResources } from "src/services";

export default function (store) {
  store.$api = createResources();
}
