// eslint-disable-next-line no-unused-vars
import { isAuth, isLogout } from "@/middlewares";

export default [
  {
    path: "/",
    name: "IndexHome",
    component: () => import("../views/Index"),
    children: [
      {
        path: "/login",
        name: "LoginPopup",
        component: () => import("../views/Login"),
        meta: {
          middlewares: [isLogout],
        },
      },
    ],
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart"),
  },
  {
    path: "/user",
    redirect: "/user/profile",
    name: "User",
    component: () => import("../views/User"),
    children: [
      {
        path: "/user/orders",
        name: "Orders",
        component: () => import("../views/Orders"),
        meta: {
          middlewares: [isAuth],
        },
      },
      {
        path: "/user/profile",
        name: "Profile",
        component: () => import("../views/Profile"),
        meta: {
          middlewares: [isAuth],
        },
      },
    ],
  },
];
