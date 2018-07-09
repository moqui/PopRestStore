var CheckOutPage = {
  name: "checkout-page",
  data() {
    return {
      productsInCart: [],
      shippingAddress: {},
      shippingAddressSelect: {},
      paymentMethod: {},
      shippingMethod: {},
      billingAddress: {},
      billingAddressOption: "",
      listShippingAddress: [],
      listPaymentMethods: [],
      countriesList: [],
      regionsList: [],
      shippingOption: "",
      addressOption: {},
      paymentOption: "",
      isSameAddress: "0",
      responseMessage: "",
      paymentId: {},
      urlList: {},
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
      CustomerService.getShippingAddresses(this.axiosConfig).then(function (data) {
        this.listShippingAddress = data.postalAddressList;
      }.bind(this));
    },
    addCustomerShippingAddress() {
      if(this.shippingAddress.toName == null || 
        this.shippingAddress.toName.trim() == "" ||
        this.shippingAddress.countryGeoId == null ||
        this.shippingAddress.countryGeoId.trim() == "" ||
        this.shippingAddress.city == null ||
        this.shippingAddress.city.trim() == "" ||
        this.shippingAddress.address1 == null ||
        this.shippingAddress.address1.trim() == "" ||
        this.shippingAddress.postalCode == null ||
        this.shippingAddress.postalCode.trim() == "") {
        console.log(this.shippingAddress);
        this.responseMessage = "Verify the required fields";
        return;
      } 
      CustomerService.addShippingAddress(this.shippingAddress,this.axiosConfig).then(function (data) {
        this.shippingAddress = {};
        this.getCustomerShippingAddresses();
        this.hideModal("modal1");
      }.bind(this));
    },
    getCartShippingOptions() {
      ProductService.getCartShippingOptions(this.axiosConfig).then(function (data) {
        this.listShippingOptions = data.shippingOptions;
      }.bind(this));
    },
    getCountries() {
      GeoService.getCountries().then(function (data) {
        this.countriesList = data.geoList;
      }.bind(this));
    },
    getRegions(geoId) {
      GeoService.getRegions(geoId).then(function (data){
        this.regionsList = data.resultList;
      }.bind(this));
    },
    getCartInfo() {
      ProductService.getCartInfo(this.axiosConfig).then(function (data) {
          if(data.postalAddress != undefined) {
            this.addressOption = data.postalAddress.contactMechId + ':' + data.postalAddress.telecomContactMechId;
            this.shippingAddressSelect = data.postalAddress;
            this.shippingAddressSelect.contactNumber = data.telecomNumber.contactNumber;
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
            this.billingAddressOption = data.paymentInfoList[0].paymentMethod.postalContactMechId + ':' +data.paymentInfoList[0].paymentMethod.telecomContactMechId; 
            this.selectBillingAddress(data.paymentInfoList[0]);
            for(var x in this.listPaymentMethods) {
              if(this.paymentOption === this.listPaymentMethods[x].paymentMethodId) {
                this.selectPaymentMethod(this.listPaymentMethods[x]);
                this.selectBillingAddress(this.listPaymentMethods[x]);
                break;
              }
            }
          }
          this.productsInCart = data;
      }.bind(this));
    },
    addCustomerPaymentMethod() {
      this.paymentMethod.paymentMethodTypeEnumId = "PmtCreditCard";
      if(this.paymentMethod.titleOnAccount == null || 
        this.paymentMethod.titleOnAccount.trim() == "" ||
        this.paymentMethod.cardNumber == null ||
        this.paymentMethod.cardNumber.trim() == "" ||
        this.paymentMethod.expireMonth == null || 
        this.paymentMethod.expireMonth.trim() == "" || 
        this.paymentMethod.expireYear == null || 
        this.paymentMethod.expireYear.trim() == "" || 
        this.paymentMethod.cardSecurityCode == null ||
        this.paymentMethod.cardSecurityCode.trim() == "") {
        this.responseMessage = "Verify the required fields";
        return;
      }

      if(this.paymentMethod.cardNumber.startsWith("5")) {
        this.paymentMethod.creditCardTypeEnumId = "CctMastercard";
      } else if(this.paymentMethod.cardNumber.startsWith("4")){
        this.paymentMethod.creditCardTypeEnumId = "CctVisa";
      }

      if(this.isSameAddress && this.paymentMethod.postalContactMechId == null) {
        this.paymentMethod.postalContactMechId = this.addressOption.split(':')[0];
        this.paymentMethod.telecomContactMechId = this.addressOption.split(':')[1];
      }
      CustomerService.addPaymentMethod(this.paymentMethod,this.axiosConfig).then(function (data) {
        this.hideModal("modal2");
        this.paymentMethod = {};
        this.getCustomerPaymentMethods();
        this.responseMessage = "";
      }.bind(this))
      .catch(function (error) {
        this.responseMessage = "An error occurred";
      }.bind(this));
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
        this.paymentId = data;   
        this.getCartInfo();
      }.bind(this));
    },
    setOptionNavbar(option) {
      this.optionNavbar = option; 
    },
    getCustomerPaymentMethods() {
      CustomerService.getPaymentMethods(this.axiosConfig).then(function (data) {
        this.listPaymentMethods = data.methodInfoList;
      }.bind(this));
    },
    setCartPlace() {
      const that = this;
      var data = {
        "cardSecurityCodeByPaymentId": this.paymentId
      };
      ProductService.setCartPlace(data,this.axiosConfig).then(function (data) {
        this.$router.push({ name: 'successcheckout', params: { orderId: data.orderHeader.orderId }});
      }.bind(this))
      .catch(function (error) {
        this.responseMessage = error.
        console.log(error);
      });
    },
    deletePaymentMethod(paymentMethodId) {
      CustomerService.deletePaymentMethod(paymentMethodId,this.axiosConfig).then(function (data) {
        this.getCustomerPaymentMethods();
      }.bind(this));
    },
    deleteShippingAddress(contactMechId,contactMechPurposeId) {
      CustomerService.deleteShippingAddress(contactMechId,contactMechPurposeId, this.axiosConfig).then(function (data) {
        this.getCustomerShippingAddresses();
      }.bind(this));
    },
    updateProductQuantity(item) {
      var data = {
        "orderId": item.orderId,
        "orderItemSeqId": item.orderItemSeqId,
        "quantity": item.quantity
      }
      ProductService.updateProductQuantity(data,this.axiosConfig).then(function (data) {
        this.getCartInfo();
      }.bind(this));
    },
    deleteOrderProduct(item) {
      ProductService.deleteOrderProduct(item.orderId,item.orderItemSeqId,this.axiosConfig).then(function (data) {
        this.getCartInfo();
      }.bind(this));
    },
    selectBillingAddress(address) {
      this.paymentMethod.address1 = address.postalAddress.address1;
      this.paymentMethod.address2 = address.postalAddress.address2;
      this.paymentMethod.toName = address.postalAddress.toName;
      this.paymentMethod.city = address.postalAddress.city;
      this.paymentMethod.countryGeoId = address.postalAddress.countryGeoId;
      this.paymentMethod.contactNumber = address.telecomNumber.contactNumber;
      this.paymentMethod.postalCode = address.postalAddress.postalCode;
      this.paymentMethod.stateProvinceGeoId = address.postalAddress.stateProvinceGeoId;
      this.responseMessage = "";
    },
    selectAddress(address) {
      this.shippingAddress = {};
      this.shippingAddress.address1 = address.postalAddress.address1;
      this.shippingAddress.address2 = address.postalAddress.address2;
      this.shippingAddress.toName = address.postalAddress.toName;
      this.shippingAddress.city = address.postalAddress.city;
      this.shippingAddress.countryGeoId = address.postalAddress.countryGeoId;
      this.shippingAddress.contactNumber = address.telecomNumber.contactNumber;
      this.shippingAddress.postalCode = address.postalAddress.postalCode;
      this.shippingAddress.stateProvinceGeoId = address.postalAddress.stateProvinceGeoId;
      this.shippingAddress.postalContactMechId = address.postalContactMechId;
      this.shippingAddress.telecomContactMechId = address.telecomContactMechId;
      this.responseMessage = "";
    },
    selectPaymentMethod(method) {
      this.paymentMethod = {};
      this.paymentMethod.paymentMethodId = method.paymentMethodId;
      this.paymentMethod.description = method.paymentMethod.description;
      this.paymentMethod.paymentMethodTypeEnumId = method.paymentMethod.PmtCreditCard;
      this.paymentMethod.cardNumber = method.creditCard.cardNumber;
      this.paymentMethod.titleOnAccount = method.paymentMethod.titleOnAccount;
      this.paymentMethod.expireMonth = method.expireMonth;
      this.paymentMethod.expireYear = method.expireYear;
      this.paymentMethod.cardSecurityCode = "";
      this.paymentMethod.postalContactMechId = method.paymentMethod.postalContactMechId;
      this.paymentMethod.telecomContactMechId = method.paymentMethod.telecomContactMechId;
      this.responseMessage = "";
    },
    hideModal(modalid) {
      $('#'+modalid).modal('hide');
    },
    changeShippingAddress(data) {
      this.shippingAddressSelect = data.postalAddress;
      this.shippingAddressSelect.contactNumber = data.telecomNumber.contactNumber; 
    },
    cleanShippingAddress() {
      this.shippingAddress = {};
    },
    cleanPaymentMethod() {
      this.paymentMethod = {};
    }
  },
  components: {
    "placeorder-navbar": PlaceOrderNavbarTemplate,
    "footer-page": FooterPageTemplate,
    "product-image": ProductImageTemplate
  },
  mounted() {
    this.getCartShippingOptions();
    this.getCartInfo();
    this.getCustomerShippingAddresses();
    this.getCustomerPaymentMethods();
    this.getCountries();
    if(this.productsInCart == null) {
      location.href ="/store";
    }
  }
};
var CheckOutPageTemplate = getPlaceholderRoute(
  "/store/components/pages/CheckOutPage/CheckOutPage.html",
  "CheckOutPage"
);
