import { auth } from "src/middlewares";

export default [
  {
    path: "/",
    name: "Index",
    component: () => import("../views/Index"),
    meta: {
      layout: "TheBuilder",
    },
    children: [
      {
        path: "/login",
        name: "Login",
        component: () => import("../views/Login"),
      },
    ],
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart"),
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/Orders"),
    meta: {
      middlewares: [auth],
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile"),
    meta: {
      middlewares: [auth],
    },
  },
];
