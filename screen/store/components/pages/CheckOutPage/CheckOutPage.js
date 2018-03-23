var CheckOutPage = {
  name: "checkout-page",
  data() {
    return {
      productsInCart: []
    };
  },
  methods: {

  },
  mounted() {
  	let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
         "Access-Control-Allow-Origin": "*",
         "api_key":"0AthvoPH5WZHwuYpBWQYFELYBXguxjOgKDSIvXUL",
         "moquiSessionToken":"i4xpJWD1IDc--sh47S5E"
        }
      };
    ProductService.getProductsInCart(axiosConfig).then(data => {
      console.log(data);
      this.productsInCart = data;
    });
  }
};
var CheckOutPageTemplate = getPlaceholderRoute(
  "./components/pages/CheckOutPage/CheckOutPage.html",
  "CheckOutPage"
);