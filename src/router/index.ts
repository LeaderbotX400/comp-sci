import { createRouter, createWebHistory } from "vue-router";
import { useFavicon, useTitle } from "@vueuse/core";

interface meta {
  favicon: string;
  background: {
    type: string;
    src: string;
  };
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/games/dragon",
      name: "Dragon",
      component: () => import("../views/projects/Dragon.vue"),
    },
    {
      path: "/apis/pokedex",
      name: "Pokedex",
      component: () => import("../views/projects/Pokedex.vue"),
    },
    {
      path: "/apis/weather",
      name: "Weather",
      component: () => import("../views/projects/Weather.vue"),
    },
  ],
});

export default router;
