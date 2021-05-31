import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import CharacterDetails from '../views/CharacterDetail.vue';

Vue.use(VueRouter);

const routes = [ 
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/:id",
    name: "details",
    props: true,
    component: CharacterDetails
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;