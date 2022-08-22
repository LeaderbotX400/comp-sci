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
      meta: {
        favicon: "comp-sci",
      },
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/Login.vue"),
      meta: {
        favicon: "comp-sci",
      },
    },
    {
      path: "/games/dragon",
      name: "Dragon",
      component: () => import("../views/projects/Dragon.vue"),
      meta: {
        favicon: "dragon",
      },
    },
    {
      path: "/apis/pokedex",
      name: "Pokedex",
      component: () => import("../views/projects/Pokedex.vue"),
      meta: {
        favicon: "pokemon",
      },
    },
    {
      path: "/apis/weather",
      name: "Weather",
      component: () => import("../views/projects/Weather.vue"),
      meta: {
        favicon: "weather",
      },
    },
  ],
});

export default router;
