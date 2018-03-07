// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "vue-awesome/icons/star";
import "vue-awesome/icons/star-half-o";
import "vue-awesome/icons/star-o";
import "vue-awesome/icons/search";
import "vue-awesome/icons/gift";
import "vue-awesome/icons/fire";
import "vue-awesome/icons/lock";
import "./scss/main.scss";
Vue.use(BootstrapVue)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
