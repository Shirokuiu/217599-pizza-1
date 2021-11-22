import {
  DoughsService,
  SizesService,
  SaucesService,
  IngredientsService,
  MiscService,
  AuthService,
  OrdersService,
  AddressService,
} from "@/services";

const Resources = {
  DOUGH: "dough",
  SIZES: "sizes",
  SAUCES: "sauces",
  INGREDIENTS: "ingredients",
  MISC: "misc",
  AUTH: "auth",
  ORDERS: "orders",
  ADDRESSES: "addresses",
};

export const createResources = () => ({
  [Resources.DOUGH]: new DoughsService(Resources.DOUGH),
  [Resources.SIZES]: new SizesService(Resources.SIZES),
  [Resources.SAUCES]: new SaucesService(Resources.SAUCES),
  [Resources.INGREDIENTS]: new IngredientsService(Resources.INGREDIENTS),
  [Resources.MISC]: new MiscService(Resources.MISC),
  [Resources.AUTH]: new AuthService(),
  [Resources.ORDERS]: new OrdersService(Resources.ORDERS),
  [Resources.ADDRESSES]: new AddressService(Resources.ADDRESSES),
});
