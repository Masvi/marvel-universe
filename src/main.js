import Vue from 'vue'
import App from './App.vue'
import baseComponents from './plugins/baseComponents.js'
import router from './router/routes'
import store from "./store";

Vue.config.productionTip = false
Vue.use(baseComponents)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
