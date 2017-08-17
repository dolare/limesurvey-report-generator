import Vue from 'vue'
import Router from 'vue-router'

import App from './App'
import Dashbord from './components/Dashbord'
import RptGnt from './components/RptGnt'

Vue.config.debug = true
Vue.use(Router)

const router = new Router({
  routes: [
    { name: 'dashBord', path: '/', component: Dashbord },
    { name: 'rptGnt', path: '/rptgnt', component: RptGnt }
  ]
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
