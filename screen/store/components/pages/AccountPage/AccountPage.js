var AccountPage = {
  name: "account-page",
  data() {
  	return {
      customerInfo: {},
      passwordInfo: {},
      customerAddressList: [],
      countriesList: [],
      regionsList: [],
      customerAddress: {},
      customerPaymentMethods: [],
      addressOption: "",
      paymentOption: "",
      paymentMethod: {},
      responseMessage: "",
      message: {
        state: "",
        message: ""
      },
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
    getCustomerInfo() {
      CustomerService.getCustomerInfo(this.axiosConfig).then(function (data) {
        this.customerInfo = data;
      }.bind(this));
    },
    getCustomerAddress() {
      CustomerService.getShippingAddresses(this.axiosConfig).then(function (data) {
        this.customerAddressList = data.postalAddressList;
      }.bind(this));  
    },
    getCustomerPaymentMethods() {
      CustomerService.getPaymentMethods(this.axiosConfig).then(function (data) {
        this.customerPaymentMethods = data.methodInfoList;
      }.bind(this));
    },
    addCustomerAddress() {
      CustomerService.addShippingAddress(this.customerAddress,this.axiosConfig).then(function (data) {
        this.customerAddress = {};
        this.getCustomerAddress();
        this.hideModal("modal1");
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
        this.paymentMethod.creditCardTypeEnumId = "CctMasterCard";
      } else if(this.paymentMethod.cardNumber.startsWith("4")){
        this.paymentMethod.creditCardTypeEnumId = "CctVisa";
      }
     

      CustomerService.addPaymentMethod(this.paymentMethod,this.axiosConfig).then(function (data) {
        this.hideModal("modal2");
        this.paymentMethod = {};
        this.getCustomerPaymentMethods();
        this.responseMessage = "";
      }.bind(this));
    },
    updateCustomerInfo() {
      if(this.customerInfo.username == null || this.customerInfo.username.trim() == ""
          || this.customerInfo.firstName == null || this.customerInfo.firstName.trim() == ""
          || this.customerInfo.lastName == null || this.customerInfo.lastName.trim() == ""
          || this.customerInfo.emailAddress == null || this.customerInfo.emailAddress.trim() == ""
          || this.customerInfo.locale == null || this.customerInfo.trim() == ""
          || this.customerInfo.timeZone == null || this.customerInfo.trim() == "") {
        this.message.state = 2;
        this.message.message = "Verify the required fields";
        return;
      }
      CustomerService.updateCustomerInfo(this.customerInfo,this.axiosConfig).then(function (data) {
        this.customerInfo = data.customerInfo;
        this.message.state = 1;
        this.message.message = "Correct your data have been updated!";
      }.bind(this));
    },
    updateCustomerPassword() {
      var expreg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,35}$/;
      if(!expreg.test(this.passwordInfo.newPassword)) {
        this.responseMessage = "The password must have at least 8 characters, a special character," +
        " a lowercase letter, a capital letter and at least one number.";
        return;
      }

      if(this.passwordInfo.newPassword != this.passwordInfo.newPasswordVerify) {
        this.responseMessage = "Passwords do not match";
        return;
      }

      this.passwordInfo.userId = this.customerInfo.userId;

      CustomerService.updateCustomerPassword(this.passwordInfo,this.axiosConfig).then(function (data) {
        console.log(data);
        this.message.state = 1;
        this.message.message = data.messages.replace("null",this.customerInfo.username);
        this.passwordInfo = {};
        this.hideModal("modal");
      }.bind(this))
      .catch(function (error) {
        this.message.state = 2;
        this.message.message = "An error occurred";
        this.hideModal("modal");
      }.bind(this));
    },
    deletePaymentMethod(paymentMethodId) {
      CustomerService.deletePaymentMethod(paymentMethodId,this.axiosConfig).then(function (data) {
        this.getCustomerPaymentMethods();
      }.bind(this));
    },
    deleteShippingAddress(contactMechId,contactMechPurposeId) {
      CustomerService.deleteShippingAddress(contactMechId,contactMechPurposeId, this.axiosConfig).then(function (data) {
        this.getCustomerAddress();
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
    selectAddress(address) {
      this.customerAddress = {};
      this.customerAddress.address1 = address.postalAddress.address1;
      this.customerAddress.address2 = address.postalAddress.address2;
      this.customerAddress.toName = address.postalAddress.toName;
      this.customerAddress.city = address.postalAddress.city;
      this.customerAddress.countryGeoId = address.postalAddress.countryGeoId;
      this.customerAddress.contactNumber = address.telecomNumber.contactNumber;
      this.customerAddress.postalCode = address.postalAddress.postalCode;
      this.customerAddress.stateProvinceGeoId = address.postalAddress.stateProvinceGeoId;
      this.customerAddress.postalContactMechId = address.postalContactMechId;
      this.customerAddress.telecomContactMechId = address.telecomContactMechId;
      if(this.customerAddress.countryGeoId != null){
        this.getRegions(this.customerAddress.countryGeoId);
      }
    },
    selectPaymentMethod(method) {
      this.paymentMethod = {};
      this.paymentMethod.paymentMethodId = method.paymentMethodId;
      this.paymentMethod.paymentMethodTypeEnumId = method.paymentMethod.PmtCreditCard;
      this.paymentMethod.cardNumber = method.creditCard.cardNumber;
      this.paymentMethod.titleOnAccount = method.paymentMethod.titleOnAccount;
      this.paymentMethod.expireMonth = method.expireMonth;
      this.paymentMethod.expireYear = method.expireYear;
      this.paymentMethod.cardSecurityCode = "";
    },
    hideModal(modalid) {
      $('#'+modalid).modal('hide');
    }
  },
  components: {
    navbar: NavbarTemplate,
    "footer-page": FooterPageTemplate
  },
  mounted() {
    if(storeInfo.apiKey == null) {
      this.$router.push({ name: 'Products'});
    }else {
      this.getCustomerInfo();
      this.getCustomerAddress();
      this.getCustomerPaymentMethods();
      this.getCountries();
      this.getRegions();
    }
  } 
};
var AccountPageTemplate = getPlaceholderRoute(
  "/store/components/pages/AccountPage/AccountPage.html",
  "AccountPage"
);
