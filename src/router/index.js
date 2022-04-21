import { createRouter, createWebHistory } from "vue-router";

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
  {
    path: "/register",
    name: "Rgister",
    component: () => import("../components/Register.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../components/login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
