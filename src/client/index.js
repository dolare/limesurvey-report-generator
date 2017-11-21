import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'

import App from './App'
import RptGnt from './components/RptGnt'

Vue.config.debug = true
Vue.use(Router)
Vue.use(VueResource)

const router = new Router({
  routes: [
    { name: 'rptGnt', path: '/', component: RptGnt }
  ]
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
