var CheckOutPage = {
  name: "checkout-page",
  data() {
    return {
      productsInCart: [],
      shippingAddress: {},
      listShippingAddress: [],
      axiosConfig: {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "api_key":"0AthvoPH5WZHwuYpBWQYFELYBXguxjOgKDSIvXUL",
          "moquiSessionToken":"i4xpJWD1IDc--sh47S5E"
        }
      }
    };
  },
  methods: {
    addShippingAddress(){
      CustomerService.addShippingAddress(shippingAddress,this.axiosConfig).then(data => {
        console.log(data);
      });
    }
  },
  mounted() {
    ProductService.getProductsInCart(this.axiosConfig).then(data => {
      console.log(data);
      this.productsInCart = data;
    });
    CustomerService.getShippingAddresses(this.axiosConfig).then(data => {
      console.log(data);
      this.listShippingAddress = data;
    });
  }
};
var CheckOutPageTemplate = getPlaceholderRoute(
  "./components/pages/CheckOutPage/CheckOutPage.html",
  "CheckOutPage"
);