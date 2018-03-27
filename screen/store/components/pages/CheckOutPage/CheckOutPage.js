var CheckOutPage = {
  name: "checkout-page",
  data() {
    return {
      productsInCart: [],
      shippingAddress: {},
      paymentMethod: {},
      listShippingAddress: [],
      listPaymentMethods: [],
      axiosConfig: {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "api_key":storeInfo.apiKey,
          "moquiSessionToken":storeInfo.moquiSessionToken
        }
      }
    };
  },
  methods: {
    addShippingAddress() {
      console.log(this.shippingAddress);
      CustomerService.addShippingAddress(this.shippingAddress,this.axiosConfig).then(data => {
        console.log(data);
        ProductService.addAddressToCart(data,this.axiosConfig).then(data => {
          this.shippingAddress = {};
          this.hideModal();
        });
      });
    },
    addCustomerPaymentMethod() {
      CustomerService.addPaymentMethod(this.paymentMethod,this.axiosConfig).then(data => {
        console.log(data);
      });
    },
    hideModal() {
      this.$refs.modal1.hide();
    }
  },
  mounted() {
    ProductService.getProductsInCart(this.axiosConfig).then(data => {
      //Test to get adddress
      this.listShippingAddress = data.postalAddress;
      this.productsInCart = data;
    });
    CustomerService.getPaymentMethods(this.axiosConfig).then(data => {
      this.listPaymentMethods = data.methodInfoList;
    });
  }
};
var CheckOutPageTemplate = getPlaceholderRoute(
  "./components/pages/CheckOutPage/CheckOutPage.html",
  "CheckOutPage"
);