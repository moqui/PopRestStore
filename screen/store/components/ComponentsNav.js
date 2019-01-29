/* This software is in the public domain under CC0 1.0 Universal plus a Grant of Patent License. */
storeComps.Navbar = {
  name: "navbar",
  data: function() { return {
      customerInfo: {}, categories: [], searchText: "", productsQuantity: 0, storeInfo: [],
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
  created() {
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
  }
};
storeComps.NavbarTemplate = getPlaceholderRoute("template_client_header", "Navbar", storeComps.Navbar.props);
Vue.component("navbar", storeComps.NavbarTemplate);

storeComps.FooterPage = {
    name: "footer-page",
    data() { return {}; },
    props: ["infoLink"]
};
storeComps.FooterPageTemplate = getPlaceholderRoute("template_client_footer", "FooterPage", storeComps.FooterPage.props);
Vue.component("footer-page", storeComps.FooterPageTemplate);

storeComps.MenuLeft = {
    name: "menu-left",
    data() { return {}; },
    props: ["type"]
};
storeComps.MenuLeftTemplate = getPlaceholderRoute("template_client_menu", "MenuLeft", storeComps.MenuLeft.props);
Vue.component("menu-left", storeComps.MenuLeftTemplate);


storeComps.ModalAddress = {
    name: "modal-address",
    data() { return { 
      axiosConfig: { headers: { "Content-Type": "application/json;charset=UTF-8", "Access-Control-Allow-Origin": "*",
              "api_key":this.$root.apiKey, "moquiSessionToken":this.$root.moquiSessionToken }},
      toNameErrorMessage: "", 
      countryErrorMessage: "",
      addressErrorMessage: "",
      cityErrorMessage: "",
      postalCodeErrorMessage: "",
      stateErrorMessage: "",
      contactNumberErrorMessage: "",
      regionsList: []
    }; },
    props: ["shippingAddress", "isUpdate", "cancelCallback", "completeCallback"],
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
            }
            if(error){
                return;
            }

            CustomerService.addShippingAddress(this.shippingAddress, this.axiosConfig).then(function (data) {
                this.responseMessage = "";
                this.completeCallback(data);
            }.bind(this));
        }
    }
};
storeComps.ModalAddressTemplate = getPlaceholderRoute("template_client_modalAddress", "ModalAddress", storeComps.ModalAddress.props);
Vue.component("modal-address", storeComps.ModalAddressTemplate);
