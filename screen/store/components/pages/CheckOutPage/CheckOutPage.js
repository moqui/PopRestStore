var CheckOutPage = {
  name: "checkout-page",
  data() {
    return {
      productsInCart: [],
      shippingAddress: {},
      paymentMethod: {},
      shippingMethod: {},
      listShippingAddress: [],
      listPaymentMethods: [],
      shippingOption: "",
      addressOption: {},
      paymentOption: "",
      paymentId: {},
      stateShippingAddress:1,
      stateShippingMethod:0,
      statePaymentMethod:0,
      listShippingOptions: [],
      optionNavbar:1,
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
          if(data.postalAddress != undefined) {
            this.addressOption = data.postalAddress.contactMechId + ':' + data.postalAddress.telecomContactMechId;
            this.shippingAddress = data.postalAddress;
            this.shippingAddress.contactNumber = data.telecomNumber.contactNumber;
          }
          if(data.orderPart.carrierPartyId != undefined) {
            this.shippingOption = data.orderPart.carrierPartyId + ':' + data.orderPart.shipmentMethodEnumId;
            for(var x in this.listShippingOptions) {
              if(this.shippingOption === this.listShippingOptions[x].carrierPartyId +':'+ this.listShippingOptions[x].shipmentMethodEnumId) {
                this.shippingMethod = this.listShippingOptions[x];
                break;
              }
            }
          }
          if(data.paymentInfoList[0] != null) {
            this.paymentOption = data.paymentInfoList[0].payment.paymentMethodId;
            for(var x in this.listPaymentMethods) {
              if(this.paymentOption === this.listPaymentMethods[x].paymentMethodId) {
                this.paymentMethod = this.listPaymentMethods[x].paymentMethod;
                this.paymentMethod.expireMonth = this.listPaymentMethods[x].expireMonth; 
                this.paymentMethod.expireYear = this.listPaymentMethods[x].expireYear;
                break;
              }
            }
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
    setOptionNavbar(option) {
      this.optionNavbar = option; 
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
        this.getCartInfo();
        this.$router.push({ name: 'orders', params: { orderId: data.orderHeader.orderId }});
      });
    },
    hideModal(modalid) {
      this.$root.$emit('bv::hide::modal',modalid);
    },
    changeShippingAddress(data) {
      this.shippingAddress = data.postalAddress;
      this.shippingAddress.contactNumber = data.telecomNumber.contactNumber; 
    }, 
    changePaymentMethod(data) {
      this.paymentMethod = data.paymentMethod;
      this.paymentMethod.expireMonth = data.expireMonth; 
      this.paymentMethod.expireYear = data.expireYear;
    }
  },
  components: {
    "placeorder-navbar": PlaceOrderNavbarTemplate
  },
  mounted() {
    this.getCartShippingOptions();
    this.getCartInfo();
    this.getCustomerShippingAddresses();
    this.getCustomerPaymentMethods();
  }
};
var CheckOutPageTemplate = getPlaceholderRoute(
  "./components/pages/CheckOutPage/CheckOutPage.html",
  "CheckOutPage"
);