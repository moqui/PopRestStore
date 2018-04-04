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
      paymentId: {},
      stateShippingAddress:1,
      stateShippingMethod:0,
      statePaymentMethod:0,
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
        this.shippingAddress = {};
        this.getCustomerShippingAddresses();
        this.hideModal("modal1");
      });
    },
    getCartShippingOptions() {
      ProductService.getCartShippingOptions(this.axiosConfig).then(data => {
        this.listShippingOptions = data.shippingOptions;
      });
    },
    getCartInfo() {
      ProductService.getCartInfo(this.axiosConfig).then(data => {
        if(data){
          this.addressOption = data.postalAddress ? data.postalAddress.contactMechId + ':' + data.postalAddress.telecomContactMechId : '';
          this.shippingOption = data.orderPart.carrierPartyId ? data.orderPart.carrierPartyId + ':' + data.orderPart.shipmentMethodEnumId : '';
          this.paymentOption = data.paymentInfoList[0] ? data.paymentInfoList[0].payment.paymentMethodId : '';
        }
        this.productsInCart = data;
      });
    },
    addCustomerPaymentMethod() {
      this.paymentMethod.paymentMethodTypeEnumId = "PmtCreditCard";
      CustomerService.addPaymentMethod(this.paymentMethod,this.axiosConfig).then(data => {
        console.log(data);
        this.hideModal("modal2");
        this.paymentMethod = {};
        this.getCustomerPaymentMethods();
      });
    },
    addCartBillingShipping(option){
      var info = {
        "shippingPostalContactMechId":this.addressOption.split(':')[0],
        "shippingTelecomContactMechId":this.addressOption.split(':')[1],
        "paymentMethodId":this.paymentOption,
        "carrierPartyId":this.shippingOption.split(':')[0],
        "shipmentMethodEnumId":this.shippingOption.split(':')[1]
      };
      switch(option){
        case 1: 
          this.stateShippingAddress = 2;
          this.stateShippingMethod = 1;
          break;
        case 2:
          this.stateShippingMethod = 2;
          this.statePaymentMethod = 1;  
          break;
        case 3:
          this.statePaymentMethod = 2;  
          break;
       }
      ProductService.addCartBillingShipping(info,this.axiosConfig).then(data => {
        this.paymentId = data;   
        this.getCartInfo();
      });
    },
    getCustomerPaymentMethods() {
      CustomerService.getPaymentMethods(this.axiosConfig).then(data => {
        this.listPaymentMethods = data.methodInfoList;
      });
    },
    setCartPlace() {
      var data = {
        "cardSecurityCodeByPaymentId": this.paymentId
      };
      ProductService.setCartPlace(data,this.axiosConfig).then(data => {
        console.log(data);
        this.getCartInfo();
      });
    },
    hideModal(modalid) {
      this.$root.$emit('bv::hide::modal',modalid);
    }
  },
  mounted() {
    this.getCartInfo();
    this.getCustomerShippingAddresses();
    this.getCustomerPaymentMethods();
    this.getCartShippingOptions();
  }
};
var CheckOutPageTemplate = getPlaceholderRoute(
  "./components/pages/CheckOutPage/CheckOutPage.html",
  "CheckOutPage"
);