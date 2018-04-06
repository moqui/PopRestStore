var router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "Products",
      component: LandingPageTemplate
    },
    {
      path: "/content/:contentId",
      name: "content",
      component: WikiPage
    },
    {
      path: "/login",
      name: "login",
      component: LoginPageTemplate
    },
    {
      path: "/product/:productId",
      name: "Product",
      component: ProductPageTemplate
    },
    {
      path: "/checkout",
      name: "checkout",
      component: CheckOutPageTemplate
    },
    {
      path: "/orders",
      name: "orders",
      component: CustomerOrderPageTemplate
    }
  ]
});
