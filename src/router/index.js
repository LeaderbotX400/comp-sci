import { createRouter, createWebHistory } from "vue-router";
import { auth } from "../firebase";

const routes = [
  {
    path: "/Home",
    redirect: "/",
  },
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/games/dragon",
    name: "Dragon",
    component: () => import("../views/dragon.vue"),
  },
  {
    path: "/fetch/pokedex",
    name: "Pokedex",
    component: () => import("../views/pokedex.vue"),
  },
  {
    path: "/fetch/weather",
    name: "Weather",
    component: () => import("../views/weather.vue"),
  },
  {
    path: "/misc/todo",
    name: "ToDo",
    component: () => import("../views/todo.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!auth.loggedIn()) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
