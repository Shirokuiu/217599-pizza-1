import DoughApiService from "src/services/DoughApiService";
import SizeApiService from "src/services/SizeApiService";
import SauceApiService from "src/services/SauceApiService";
import IngredientsApiService from "src/services/IngredientsApiService";
import MiscApiService from "src/services/MiscApiService";
import AuthApiService from "src/services/AuthApiService";
import AddressApiService from "src/services/AddressApiService";
import OrdersApiService from "src/services/OrdersApiService";

const resources = {
  DOUGH: "dough",
  SIZES: "sizes",
  SAUCES: "sauces",
  INGREDIENTS: "ingredients",
  MISC: "misc",
  AUTH: "auth",
  ADDRESSES: "addresses",
  ORDERS: "orders",
};

export const createResources = () => {
  return {
    [resources.DOUGH]: new DoughApiService(resources.DOUGH),
    [resources.SIZES]: new SizeApiService(resources.SIZES),
    [resources.SAUCES]: new SauceApiService(resources.SAUCES),
    [resources.INGREDIENTS]: new IngredientsApiService(resources.INGREDIENTS),
    [resources.MISC]: new MiscApiService(resources.MISC),
    [resources.AUTH]: new AuthApiService(),
    [resources.ADDRESSES]: new AddressApiService(resources.ADDRESSES),
    [resources.ORDERS]: new OrdersApiService(resources.ORDERS),
  };
};
