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
      CustomerService.addShippingAddress(this.shippingAddress,this.axiosConfig).then(data => {
        console.log(data);
        ProductService.addAddressToCart(data,this.axiosConfig).then(data => {
          this.shippingAddress = {};
          this.hideModal('modal1');
        });
      });
    },
    addCustomerPaymentMethod() {
      this.paymentMethod.paymentMethodTypeEnumId = "PmtCreditCard";
      this.paymentMethod.paymentGatewayConfigId = "FinancialAccountLocal";
      CustomerService.addPaymentMethod(this.paymentMethod,this.axiosConfig).then(data => {
        console.log(data);
        this.hideModal("modal2");
        this.paymentMethod = {};
        this.getCustomerPaymentMethods();
      });
    },
    getCustomerPaymentMethods() {
      CustomerService.getPaymentMethods(this.axiosConfig).then(data => {
        this.listPaymentMethods = data.methodInfoList;
      });
    },
    hideModal(modalid) {
      this.$root.$emit('bv::hide::modal',modalid);
    }
  },
  mounted() {
    ProductService.getProductsInCart(this.axiosConfig).then(data => {
      //Test to get adddress
      this.listShippingAddress = data.postalAddress;
      this.productsInCart = data;
    });
    this.getCustomerPaymentMethods();
  }
};
var CheckOutPageTemplate = getPlaceholderRoute(
  "./components/pages/CheckOutPage/CheckOutPage.html",
  "CheckOutPage"
);