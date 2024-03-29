import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [ 
  {
    path: "/",
    name: "home",
    component: () => import('../views/Home.vue')
  },
  {
    path: "/details/:id",
    name: "details",
    component: () => import('../views/CharacterDetail.vue')
  },
  {
    path: "*",
    name: "404",
    component: () => import('../views/NotFound.vue')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;