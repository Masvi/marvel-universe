import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [ 
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "detail/:id",
    name: "details",
    props: true,
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
  routes,
});

export default router;