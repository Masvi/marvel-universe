import Vue from 'vue'
import App from './App.vue'
import VueToast from 'vue-toast-notification';
import install from './plugins/baseComponents'
import router from './router/routes'
import store from "./store";

import 'vue-toast-notification/dist/theme-default.css';

Vue.config.productionTip = false;

Vue.use(install);
Vue.use(VueToast);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
