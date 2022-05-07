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
    path: "/firebase/todo",
    name: "ToDo",
    component: () => import("../views/todo.vue"),
  },
  {
    path: "/firebase/chat",
    name: "Chat",
    component: () => import("../views/chat.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
