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
        favicon: "default",
      },
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/Login.vue"),
      meta: {
        favicon: "default",
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
router.afterEach((to, from) => {
  const title = useTitle();
  const favicon = useFavicon();
  title.value = to.name as string;

  // @ts-expect-error
  favicon.value = `/favicons/${to.meta.favicon}.ico` as string;
});

export default router;