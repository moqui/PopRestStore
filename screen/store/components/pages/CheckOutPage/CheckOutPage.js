var CheckOutPage = {
  name: "checkout-page",
  data() {
    return {
      productsInCart: [],
      shippingAddress: {},
      paymentMethod: {},
      listShippingAddress: [],
      listPaymentMethods: [],
      shippingOption: "",
      addressOption: "",
      paymentOption: "",
      listShippingOptions: [],
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
    getCustomerShippingAddresses() {
      CustomerService.getShippingAddresses(this.axiosConfig).then(data => {
        this.listShippingAddress = data.postalAddressList;
      });
    },
    addCustomerShippingAddress() {
      CustomerService.addShippingAddress(this.shippingAddress,this.axiosConfig).then(data => {
        this.getCustomerShippingAddresses();
        this.hideModal("modal1");
      });
    },
    getCartShippingOptions() {
      ProductService.getCartShippingOptions(this.axiosConfig).then(data => {
        this.listShippingOptions = data.shippingOptions;
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
    addCartBillingShipping(){
      var info = {
        "shippingPostalContactMechId":this.addressOption.split(':')[0],
        "shippingTelecomContactMechId":this.addressOption.split(':')[1],
        "paymentMethodId":this.paymentOption,
        "carrierPartyId":this.shippingOption.split(':')[0],
        "shipmentMethodEnumId":this.shippingOption.split(':')[1]
      };
     ProductService.addCartBillingShipping(info,this.axiosConfig).then(data => {
       console.log(data);   
     });
    },
    getCustomerPaymentMethods() {
      CustomerService.getPaymentMethods(this.axiosConfig).then(data => {
        this.listPaymentMethods = data.methodInfoList;
      });
    },
    setCartPlace(paymentId) {
      var data = {
        "cardSecurityCodeByPaymentId": paymentId
      };
      ProductService.setCartPlace(data,this.axiosConfig).then(data => {
        console.log(data);
      });
    },
    hideModal(modalid) {
      this.$root.$emit('bv::hide::modal',modalid);
    }
  },
  mounted() {
    ProductService.getCartInfo(this.axiosConfig).then(data => {
      this.addressOption = data.postalAddress ? data.postalAddress.contactMechId + ':' + data.postalAddress.telecomContactMechId : '';
      this.shippingOption = data.orderPart.carrierPartyId ? data.orderPart.carrierPartyId + ':' + data.orderPart.shipmentMethodEnumId : '';
      this.paymentOption = data.paymentInfoList ? data.paymentInfoList[0].payment.paymentMethodId : '';
      this.productsInCart = data;
    });
    this.getCustomerShippingAddresses();
    this.getCustomerPaymentMethods();
    this.getCartShippingOptions();
  }
};
var CheckOutPageTemplate = getPlaceholderRoute(
  "./components/pages/CheckOutPage/CheckOutPage.html",
  "CheckOutPage"
);