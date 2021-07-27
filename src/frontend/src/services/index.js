import DoughApiService from "src/services/DoughApiService";
import SizeApiService from "src/services/SizeApiService";

const resources = {
  DOUGH: "dough",
  SIZES: "sizes",
};

export const createResources = () => {
  return {
    [resources.DOUGH]: new DoughApiService(resources.DOUGH),
    [resources.SIZES]: new SizeApiService(resources.SIZES),
  };
};
