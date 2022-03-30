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
    path: "/games/pokemon",
    name: "Pokemon",
    component: () => import("../views/pokemon.vue"),
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
