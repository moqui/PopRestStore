// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

Vue.use(bootstrapVue);
Vue.config.productionTip = false;

/* eslint-disable no-new */
var app = new Vue({
  el: "#app",
  router,
  data() {
    return { storeComps };
  },
  store,
  template: "<App/>",
  components: {
    App
  }
});
