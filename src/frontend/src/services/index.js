import DoughApiService from "src/services/DoughApiService";
import SizeApiService from "src/services/SizeApiService";
import SauceApiService from "src/services/SauceApiService";

const resources = {
  DOUGH: "dough",
  SIZES: "sizes",
  SAUCES: "sauces",
};

export const createResources = () => {
  return {
    [resources.DOUGH]: new DoughApiService(resources.DOUGH),
    [resources.SIZES]: new SizeApiService(resources.SIZES),
    [resources.SAUCES]: new SauceApiService(resources.SAUCES),
  };
};
