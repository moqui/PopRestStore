/* This software is in the public domain under CC0 1.0 Universal plus a Grant of Patent License. */
storeComps.Navbar = {
  name: "navbar",
  data: function() { return {
      homePath: "", customerInfo: {}, categories: [], searchText: "", productsQuantity: 0, storeInfo: [],
      axiosConfig: { headers: { "Content-Type": "application/json;charset=UTF-8", "Access-Control-Allow-Origin": "*",
              "api_key":this.$root.apiKey, "moquiSessionToken":this.$root.moquiSessionToken } }
  }; },
  props: ["subBar"],
  methods: {
    getCustomerInfo: function() { CustomerService.getCustomerInfo(this.axiosConfig).then(function (data) {
        this.customerInfo = data;
    }.bind(this)).catch(function (error)  { console.log('An error has occurred' + error); }); },
    getCartInfo: function() { ProductService.getCartInfo(this.axiosConfig).then(function (data) {
        //this.productsQuantity = data.orderItemList ? data.orderItemList.length : 0;
        if(typeof(data.orderItemList) == 'undefined') return;
        for(var i = 0; i < data.orderItemList.length; i++) {
            if(data.orderItemList[i].itemTypeEnumId == 'ItemProduct') {
                this.productsQuantity = data.orderItemList[i].quantity + this.productsQuantity;
            }
        }
    }.bind(this)); },
    logout: function() { LoginService.logout().then(function (data) {
        this.$root.apiKey = null;
        this.$router.push({ name: "login"});
      }.bind(this)); 
    },
    searchProduct: function() { location.href ="/store/search/"+this.searchText; }
  },
  created: function() {
    this.storeInfo = this.$root.storeInfo;
  },
  mounted: function() {
      var vm = this;
      if (this.storeInfo.categoryByType && this.storeInfo.categoryByType.PsctBrowseRoot && this.storeInfo.categoryByType.PsctBrowseRoot.productCategoryId) {
        ProductService.getSubCategories(this.storeInfo.categoryByType.PsctBrowseRoot.productCategoryId).then(function(categories) { vm.categories = categories; }); }
      if (this.$root.apiKey != null) { 
          if(this.$root.customerInfo != null){
              this.customerInfo = this.$root.customerInfo;
          } else {
              this.getCustomerInfo();
          } 
      }
      this.getCartInfo();
      this.homePath = storeConfig.homePath;
  }
};
storeComps.NavbarTemplate = getPlaceholderRoute("template_client_header", "Navbar", storeComps.Navbar.props);
Vue.component("navbar", storeComps.NavbarTemplate);

storeComps.FooterPage = {
    name: "footer-page",
    data: function() { return {}; },
    props: ["infoLink"]
};
storeComps.FooterPageTemplate = getPlaceholderRoute("template_client_footer", "FooterPage", storeComps.FooterPage.props);
Vue.component("footer-page", storeComps.FooterPageTemplate);

storeComps.MenuLeft = {
    name: "menu-left",
    data: function() { return {}; },
    props: ["type"]
};
storeComps.MenuLeftTemplate = getPlaceholderRoute("template_client_menu", "MenuLeft", storeComps.MenuLeft.props);
Vue.component("menu-left", storeComps.MenuLeftTemplate);


storeComps.ModalAddress = {
    name: "modal-address",
    data: function() { return { 
      axiosConfig: { headers: { "Content-Type": "application/json;charset=UTF-8", "Access-Control-Allow-Origin": "*",
              "api_key":this.$root.apiKey, "moquiSessionToken":this.$root.moquiSessionToken }},
      toNameErrorMessage: "", 
      countryErrorMessage: "",
      addressErrorMessage: "",
      cityErrorMessage: "",
      postalCodeErrorMessage: "",
      stateErrorMessage: "",
      contactNumberErrorMessage: "",
      regionsList: [],
      disabled: false
    }; },
    props: ["shippingAddress", "isUpdate", "cancelCallback", "completeCallback"],
    computed: {
      isDisabled: function(){
        return this.disabled;
      }
    },
    methods: {
        getRegions: function(geoId) { 
            GeoService.getRegions(geoId).then(function (data){ this.regionsList = data.resultList; }.bind(this));
        },
        resetToNameErrorMessage: function(formField) {
            if (this.formField != "") {
                this.toNameErrorMessage = "";
            } 
        }, 
        resetCountryErrorMessage: function(formField) {
            if (this.formField != "") {
            this.countryErrorMessage = "";
            } 
        }, 
        resetAddressErrorMessage: function(formField) {
            if (this.formField != "") {
            this.addressErrorMessage = "";
            } 
        }, 
        resetCityErrorMessage: function(formField) {
            if (this.formField != "") {
            this.cityErrorMessage = "";
            } 
        }, 
        resetStateErrorMessage: function(formField) {
            if (this.formField != "") {
            this.stateErrorMessage = "";
            } 
        }, 
        resetPostalCodeErrorMessage: function(formField) {
            if (this.formField != "") {
            this.postalCodeErrorMessage = "";
            } 
        }, 
        resetContactNumberErrorMessage: function(formField) {
            if (this.formField != "") {
            this.contactNumberErrorMessage = "";
            } 
        },
        addCustomerShippingAddress: function() {
            var error = false;
            if (this.shippingAddress.toName == null || this.shippingAddress.toName.trim() === "") {
                this.toNameErrorMessage = "Please enter a recipient name";
                error = true;
            }
            if (this.shippingAddress.countryGeoId == null || this.shippingAddress.countryGeoId.trim() === "") {
                this.countryErrorMessage = "Please select a country";
                error = true;
            } 
            if (this.shippingAddress.address1 == null || this.shippingAddress.address1.trim() === "") {
                this.addressErrorMessage = "Please enter a street address";
                error = true;
            } 
            if (this.shippingAddress.city == null || this.shippingAddress.city.trim() === "") {
                this.cityErrorMessage = "Please enter a city";
                error = true;
            } 
            if (this.shippingAddress.stateProvinceGeoId == null || this.shippingAddress.stateProvinceGeoId.trim() === "") {
                this.stateErrorMessage = "Please enter a state";
                error = true;
            } 
            if (this.shippingAddress.postalCode == null || this.shippingAddress.postalCode.trim() === "") {
                this.postalCodeErrorMessage = "Please enter a postcode";
                error = true;
            } 
            if (this.shippingAddress.contactNumber == null || this.shippingAddress.contactNumber.trim() === "") {
                this.contactNumberErrorMessage = "Please enter a phone number";
                error = true;
            }else{
                var isNum = /^\d+$/.test(this.shippingAddress.contactNumber);

                if(!isNum){
                    this.contactNumberErrorMessage = "Please enter a valid phone number(only numbers)";
                    error = true;
                }
            }
            if(error){
                return;
            }

            this.disabled = true;
            CustomerService.addShippingAddress(this.shippingAddress, this.axiosConfig).then(function (data) {
                this.responseMessage = "";
                this.completeCallback(data);
            }.bind(this));
        },
        reset: function(){
            this.disabled = false;
            this.resetToNameErrorMessage();
            this.resetCountryErrorMessage();
            this.resetAddressErrorMessage();
            this.resetCityErrorMessage();
            this.resetStateErrorMessage();
            this.resetPostalCodeErrorMessage();
            this.resetContactNumberErrorMessage();
        }
    },
    mounted: function() {
      var vm = this;
      this.disabled = false;
      this.shippingAddress.countryGeoId = 'USA';
      this.getRegions(this.shippingAddress.countryGeoId);
      $('#addressModal').on('show.bs.modal', function(e) { vm.reset() });
      $('#addressFormModal').on('show.bs.modal', function(e) { vm.reset() });
    }
};
storeComps.ModalAddressTemplate = getPlaceholderRoute("template_client_modalAddress", "ModalAddress", storeComps.ModalAddress.props);
Vue.component("modal-address", storeComps.ModalAddressTemplate);



storeComps.ModalCreditCard = {
    name: "modal-credit-card",
    data: function() { return { 
      axiosConfig: { headers: { "Content-Type": "application/json;charset=UTF-8", "Access-Control-Allow-Origin": "*",
              "api_key":this.$root.apiKey, "moquiSessionToken":this.$root.moquiSessionToken }},
      responseMessage: "", 
      paymentAddressOption: "",
      countryErrorMessage: "",
      addressErrorMessage: "",
      cityErrorMessage: "",
      postalCodeErrorMessage: "",
      stateErrorMessage: "",
      contactNumberErrorMessage: "",
      regionsList: [],
      disabled: true
    }; },
    props: ["paymentMethod", "isUpdate", "addressList", "cancelCallback", "completeCallback"],
    computed: {
      isDisabled: function(){
        return this.disabled;
      }
    },
    methods: {
        getRegions: function(geoId) { 
            GeoService.getRegions(geoId).then(function (data){ this.regionsList = data.resultList; }.bind(this));
        },
        selectBillingAddress: function(address) {
            if (address == 'NEW_ADDRESS') {
                this.paymentMethod.address1 = "";
                this.paymentMethod.address2 = "";
                this.paymentMethod.toName = "";
                this.paymentMethod.attnName = "";
                this.paymentMethod.city = "";
                this.paymentMethod.countryGeoId = "";
                this.paymentMethod.contactNumber = "";
                this.paymentMethod.postalCode = "";
                this.paymentMethod.stateProvinceGeoId = "";
            } else if (typeof address.postalAddress === 'object' && address.postalAddress !== null) {
                this.paymentMethod.address1 = address.postalAddress.address1;
                this.paymentMethod.address2 = address.postalAddress.address2;
                this.paymentMethod.toName = address.postalAddress.toName;
                this.paymentMethod.attnName = address.postalAddress.attnName;
                this.paymentMethod.city = address.postalAddress.city;
                this.paymentMethod.countryGeoId = address.postalAddress.countryGeoId;
                this.paymentMethod.contactNumber = address.telecomNumber.contactNumber;
                this.paymentMethod.postalCode = address.postalAddress.postalCode;
                this.paymentMethod.stateProvinceGeoId = address.postalAddress.stateProvinceGeoId;
                this.responseMessage = "";
            }
            this.getRegions(STORE_COUNTRY);
        },
        addCustomerPaymentMethod: function(event) {
            event.preventDefault();
            this.paymentMethod.paymentMethodTypeEnumId = "PmtCreditCard";
            this.paymentMethod.countryGeoId = STORE_COUNTRY;

            if (this.paymentMethod.titleOnAccount == null || this.paymentMethod.titleOnAccount.trim() === "") {
                this.responseMessage = "Please privide the name on the card";
                return;
            }
            if (this.paymentMethod.cardNumber == null || this.paymentMethod.cardNumber.trim() === "") {
                this.responseMessage = "Please privide the card number";
                return;
            }
            if (this.paymentMethod.expireMonth == null || this.paymentMethod.expireMonth.trim() === ""
                || this.paymentMethod.expireYear == null || this.paymentMethod.expireYear === "") {
                this.responseMessage = "Please privide the card expiry month and year";
                return;
            }
            if (this.paymentMethod.address1 == null || this.paymentMethod.address1.trim() === "" ||
                this.paymentMethod.city == null || this.paymentMethod.city.trim() === "") {
                this.responseMessage = "Please provide a billing address";
                return;
            }
            if (this.paymentMethod.cardNumber.startsWith("5")) {
                this.paymentMethod.creditCardTypeEnumId = "CctMastercard";
            } else if (this.paymentMethod.cardNumber.startsWith("4")){
                this.paymentMethod.creditCardTypeEnumId = "CctVisa";
            }
           
            if (this.paymentMethod.postalContactMechId == null) {
                this.paymentMethod.postalContactMechId = this.paymentAddressOption.postalContactMechId;
                this.paymentMethod.telecomContactMechId = this.paymentAddressOption.telecomContactMechId;
            }
            if (this.isUpdate) { this.paymentMethod.cardNumber = ""; }

            this.disabled = true;
            CustomerService.addPaymentMethod(this.paymentMethod,this.axiosConfig).then(function (data) {
                this.responseMessage = "";
                this.completeCallback(data);
            }.bind(this)).catch(function (error) {
                var errorString = error.response.data.errors;
                var sensitiveDataIndex = errorString.indexOf("(for field");

                if (sensitiveDataIndex > -1) {
                    this.responseMessage = errorString.slice(0, sensitiveDataIndex);
                }

                this.disabled = false;
            }.bind(this));
        },
        reset: function(){
          $("#modal-card-content").trigger('reset');
          this.disabled = false;
          this.responseMessage = null;
          this.paymentAddressOption = "";
        }
    },
    mounted: function() {
      var vm = this;
      this.disabled = false;
      $('#creditCardModal').on('show.bs.modal', function(e){ vm.reset() });
    }
};
storeComps.ModalCreditCardTemplate = getPlaceholderRoute("template_client_modalCreditCard", "ModalCreditCard", storeComps.ModalCreditCard.props);
Vue.component("modal-credit-card", storeComps.ModalCreditCardTemplate);
