import Vue from 'vue'
import App from './App.vue'
import baseComponents from './plugins/baseComponents.js'
import router from './router/routes'

Vue.config.productionTip = false
Vue.use(baseComponents)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
