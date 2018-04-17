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
      const that = this;
      CustomerService.getShippingAddresses(this.axiosConfig).then(function (data) {
        that.listShippingAddress = data.postalAddressList;
      });
    },
    addCustomerShippingAddress() {
      const that = this;
      CustomerService.addShippingAddress(this.shippingAddress,this.axiosConfig).then(function (data) {
        that.shippingAddress = {};
        that.getCustomerShippingAddresses();
        that.hideModal("modal1");
      });
    },
    getCartShippingOptions() {
      const that = this;
      ProductService.getCartShippingOptions(this.axiosConfig).then(function (data) {
        that.listShippingOptions = data.shippingOptions;
      });
    },
    getCartInfo() {
      const that = this;
      ProductService.getCartInfo(this.axiosConfig).then(function (data) {
          if(data.postalAddress != undefined) {
            that.addressOption = data.postalAddress.contactMechId + ':' + data.postalAddress.telecomContactMechId;
            that.shippingAddress = data.postalAddress;
            that.shippingAddress.contactNumber = data.telecomNumber.contactNumber;
          }
          if(data.orderPart.carrierPartyId != undefined) {
            that.shippingOption = data.orderPart.carrierPartyId + ':' + data.orderPart.shipmentMethodEnumId;
            for(var x in that.listShippingOptions) {
              if(that.shippingOption === that.listShippingOptions[x].carrierPartyId +':'+ that.listShippingOptions[x].shipmentMethodEnumId) {
                that.shippingMethod = that.listShippingOptions[x];
                break;
              }
            }
          }
          if(data.paymentInfoList[0] != null) {
            that.paymentOption = data.paymentInfoList[0].payment.paymentMethodId;
            for(var x in that.listPaymentMethods) {
              if(that.paymentOption === that.listPaymentMethods[x].paymentMethodId) {
                that.paymentMethod = that.listPaymentMethods[x].paymentMethod;
                that.paymentMethod.expireMonth = that.listPaymentMethods[x].expireMonth; 
                that.paymentMethod.expireYear = that.listPaymentMethods[x].expireYear;
                break;
              }
            }
          }
          that.productsInCart = data;
      });
    },
    addCustomerPaymentMethod() {
      const that = this;
      this.paymentMethod.paymentMethodTypeEnumId = "PmtCreditCard";
      CustomerService.addPaymentMethod(this.paymentMethod,this.axiosConfig).then(function (data) {
        console.log(data);
        that.hideModal("modal2");
        that.paymentMethod = {};
        that.getCustomerPaymentMethods();
      });
    },
    addCartBillingShipping(option){
      const that = this;
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
          $('#collapse2').collapse("show");
          break;
        case 2:
          this.stateShippingMethod = 2;
          this.statePaymentMethod = 1;
          $('#collapse3').collapse("show");  
          break;
        case 3:
          this.statePaymentMethod = 2;  
          $('#collapse4').collapse("show");
          break;
       }
      ProductService.addCartBillingShipping(info,this.axiosConfig).then(function (data) {
        that.paymentId = data;   
        that.getCartInfo();
      });
    },
    setOptionNavbar(option) {
      this.optionNavbar = option; 
    },
    getCustomerPaymentMethods() {
      const that = this;
      CustomerService.getPaymentMethods(this.axiosConfig).then(function (data) {
        that.listPaymentMethods = data.methodInfoList;
      });
    },
    setCartPlace() {
      const that = this;
      var data = {
        "cardSecurityCodeByPaymentId": this.paymentId
      };
      ProductService.setCartPlace(data,this.axiosConfig).then(function (data) {
        that.getCartInfo();
        that.$router.push({ name: 'successcheckout', params: { orderId: data.orderHeader.orderId }});
      });
    },
    hideModal(modalid) {
      $('#'+modalid).modal('hide');
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
    "placeorder-navbar": PlaceOrderNavbarTemplate,
    "footer-page": FooterPageTemplate
  },
  mounted() {
    this.getCartShippingOptions();
    this.getCartInfo();
    this.getCustomerShippingAddresses();
    this.getCustomerPaymentMethods();
  }
};
var CheckOutPageTemplate = getPlaceholderRoute(
  "/store/components/pages/CheckOutPage/CheckOutPage.html",
  "CheckOutPage"
);