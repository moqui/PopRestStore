import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from "../components/pages/LandingPage/LandingPage";
import WikiPage from "../components/pages/WikiPage/WikiPage";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "Products",
      component: LandingPage
    },
    {
      path: "/content/:contentId",
      name: "content",
      component: WikiPage
    }
  ]
});
