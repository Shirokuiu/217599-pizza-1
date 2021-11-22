import Vue from "vue";
import Router from "vue-router";
import routes from "./routes";
import store from "src/store";
import middlewarePipeline from "@/middlewares/middleware-pipeline";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// NOTE Чтобы при смене роута не дергался store.dispatch
let isFirstLoad = false;

router.beforeEach(async (to, from, next) => {
  if (!isFirstLoad) {
    // NOTE Делаю из за того что сначала должен отмутироваться стор и только после этого запуститься мидлвары
    await store.dispatch("Auth/checkAuth");

    isFirstLoad = true;
  }

  const middlewares = to.meta.middlewares;

  if (!middlewares?.length) {
    return next();
  }

  const context = { to, from, next, store };
  const firstMiddlewareIndex = 0;
  const nextMiddlewareIndex = 1;

  return middlewares[firstMiddlewareIndex]({
    ...context,
    nextMiddleware: middlewarePipeline(
      context,
      middlewares,
      nextMiddlewareIndex
    ),
  });
});

export default router;
