import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '../components/pages/LandingPage/LandingPage'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Products',
      component: LandingPage
    }
  ]
})
