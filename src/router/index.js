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
    component: () => import("../views/dragon/dragon.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
