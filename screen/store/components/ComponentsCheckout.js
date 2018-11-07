/* This software is in the public domain under CC0 1.0 Universal plus a Grant of Patent License. */
storeComps.CheckoutNavbar = {
  name: "orderNavbar",
  data() { return {}; },
  props: ["option"]
};
storeComps.CheckoutNavbarTemplate = getPlaceholderRoute("template_client_checkoutHeader", "CheckoutNavbar", storeComps.CheckoutNavbar.props);
Vue.component("checkout-navbar", storeComps.CheckoutNavbarTemplate);

storeComps.CheckOutPage = {
    name: "checkout-page",
    data: function() { return {
        productsInCart: [], shippingAddress: {}, shippingAddressSelect: {}, paymentMethod: {}, shippingMethod: {},
        billingAddress: {}, billingAddressOption: "", listShippingAddress: [], listPaymentMethods: [],
        countriesList: [], regionsList: [], shippingOption: "", addressOption: "", paymentOption: "", isSameAddress: "0",
        isUpdate: false, isSpinner: false, responseMessage: "", paymentId: {}, urlList: {},
        stateShippingAddress:1, stateShippingMethod:0, statePaymentMethod:0, listShippingOptions: [], optionNavbar:1,
        axiosConfig: { headers: { "Content-Type": "application/json;charset=UTF-8", "Access-Control-Allow-Origin": "*",
                "api_key":this.$root.apiKey, "moquiSessionToken":this.$root.moquiSessionToken } }
    }; },
    methods: {
        getCustomerShippingAddresses: function() {
            CustomerService.getShippingAddresses(this.axiosConfig).then(function (data) {
                this.listShippingAddress = data.postalAddressList;
            }.bind(this));
        },
        addCustomerShippingAddress: function() {
            if (this.shippingAddress.toName == null || this.shippingAddress.toName.trim() === "" ||
                this.shippingAddress.countryGeoId == null || this.shippingAddress.countryGeoId.trim() === "" ||
                this.shippingAddress.city == null || this.shippingAddress.city.trim() === "" ||
                this.shippingAddress.address1 == null || this.shippingAddress.address1.trim() === "") {
                this.responseMessage = "Verify the required fields";
                return;
            }

            CustomerService.addShippingAddress(this.shippingAddress,this.axiosConfig).then(function (data) {
                this.shippingAddress = {};
                this.getCustomerShippingAddresses();
                this.hideModal("modal1");
            }.bind(this));
        },
        getCartShippingOptions: function() {
            ProductService.getCartShippingOptions(this.axiosConfig)
                .then(function (data) { this.listShippingOptions = data.shippingOptions; }.bind(this));
        },
        getCountries: function() { GeoService.getCountries().then(function (data) { this.countriesList = data.geoList; }.bind(this)); },
        getRegions: function(geoId) { GeoService.getRegions(geoId).then(function (data){ this.regionsList = data.resultList; }.bind(this)); },
        getCartInfo: function() {
            ProductService.getCartInfo(this.axiosConfig).then(function (data) {
                if (data.postalAddress) {
                    this.addressOption = data.postalAddress.contactMechId + ':' + data.postalAddress.telecomContactMechId;
                    this.shippingAddressSelect = data.postalAddress;
                    this.shippingAddressSelect.contactNumber = data.telecomNumber.contactNumber;
                }
                if (data.orderPart.carrierPartyId) {
                    this.shippingOption = data.orderPart.carrierPartyId + ':' + data.orderPart.shipmentMethodEnumId;
                    for(var x in this.listShippingOptions) {
                        if(this.shippingOption === this.listShippingOptions[x].carrierPartyId +':'+ this.listShippingOptions[x].shipmentMethodEnumId) {
                            this.shippingMethod = this.listShippingOptions[x];
                            break;
                        }
                    }
                }
                if (data.paymentInfoList && data.paymentInfoList.length) {
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
        addCustomerPaymentMethod: function() {
            this.paymentMethod.paymentMethodTypeEnumId = "PmtCreditCard";
            if (this.paymentMethod.titleOnAccount == null || this.paymentMethod.titleOnAccount.trim() === "" ||
                this.paymentMethod.cardNumber == null || this.paymentMethod.cardNumber.trim() === "" ||
                this.paymentMethod.expireMonth == null || this.paymentMethod.expireMonth.trim() === "" ||
                this.paymentMethod.expireYear == null || this.paymentMethod.expireYear.trim() === "" ||
                this.paymentMethod.cardSecurityCode == null || this.paymentMethod.cardSecurityCode.trim() === "") {
                this.responseMessage = "Verify the required fields";
                return;
            }
            if (this.paymentMethod.cardSecurityCode.length < 3 || this.paymentMethod.cardSecurityCode.length > 4) {
                this.responseMessage = "Must type a valid CSC";
                return;
            }
            if (this.paymentMethod.cardNumber.startsWith("5")) {
                this.paymentMethod.creditCardTypeEnumId = "CctMastercard";
            } else if (this.paymentMethod.cardNumber.startsWith("4")){
                this.paymentMethod.creditCardTypeEnumId = "CctVisa";
            }
            if (this.isSameAddress && this.paymentMethod.postalContactMechId == null) {
                this.paymentMethod.postalContactMechId = this.addressOption.split(':')[0];
                this.paymentMethod.telecomContactMechId = this.addressOption.split(':')[1];
            }
            if (this.isUpdate) { this.paymentMethod.cardNumber = ""; }

            CustomerService.addPaymentMethod(this.paymentMethod,this.axiosConfig).then(function (data) {
                this.hideModal("modal2");
                this.paymentMethod = {};
                this.getCustomerPaymentMethods();
                this.responseMessage = "";
            }.bind(this)).catch(function (error) {
                this.responseMessage = "An error occurred";
            }.bind(this));
        },
        addCartBillingShipping: function(option){
            var info = {
                "shippingPostalContactMechId":this.addressOption.split(':')[0], "shippingTelecomContactMechId":this.addressOption.split(':')[1],
                "paymentMethodId":this.paymentOption, "carrierPartyId":this.shippingOption.split(':')[0], "shipmentMethodEnumId":this.shippingOption.split(':')[1]
            };
            switch (option){
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
        setOptionNavbar: function(option) { this.optionNavbar = option; },
        getCustomerPaymentMethods: function() {
            CustomerService.getPaymentMethods(this.axiosConfig)
                .then(function (data) { this.listPaymentMethods = data.methodInfoList; }.bind(this));
        },
        setCartPlace: function() {
            var data = { "cardSecurityCodeByPaymentId": this.paymentId };
            this.isSpinner = true;
            ProductService.setCartPlace(data,this.axiosConfig).then(function (data) {
                if(data.orderHeader != null) {
                    this.$router.push({ name: 'successcheckout', params: { orderId: data.orderHeader.orderId }});
                } else {
                    this.isSpinner = false;
                    this.showModal("modal-error");
                }
                if(data.messages.includes("error") && data.messages.includes("122")) {
                    this.responseMessage = "Please provide a valid Billing ZIP";
                } else {
                    this.responseMessage = data.messages;
                }
            }.bind(this)).catch(function (error) {
                this.isSpinner = true;
                this.responseMessage = error;
                this.showModal("modal-error");
            }.bind(this));
        },
        deletePaymentMethod: function(paymentMethodId) {
            CustomerService.deletePaymentMethod(paymentMethodId,this.axiosConfig).then(function (data) {
                this.getCustomerPaymentMethods();
            }.bind(this));
        },
        deleteShippingAddress: function(contactMechId,contactMechPurposeId) {
            CustomerService.deleteShippingAddress(contactMechId,contactMechPurposeId, this.axiosConfig).then(function (data) {
                this.getCustomerShippingAddresses();
            }.bind(this));
        },
        updateProductQuantity: function(item) {
            var data = { "orderId": item.orderId, "orderItemSeqId": item.orderItemSeqId, "quantity": item.quantity };
            ProductService.updateProductQuantity(data, this.axiosConfig)
                .then(function (data) { this.getCartInfo(); }.bind(this));
        },
        deleteOrderProduct: function(item) {
            ProductService.deleteOrderProduct(item.orderId, item.orderItemSeqId, this.axiosConfig)
                .then(function (data) { this.getCartInfo(); }.bind(this));
        },
        selectBillingAddress: function(address) {
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
        },
        selectAddress: function(address) {
            this.shippingAddress = {};
            this.shippingAddress.address1 = address.postalAddress.address1;
            this.shippingAddress.address2 = address.postalAddress.address2;
            this.shippingAddress.toName = address.postalAddress.toName;
            this.shippingAddress.attnName = address.postalAddress.attnName;
            this.shippingAddress.city = address.postalAddress.city;
            this.shippingAddress.countryGeoId = address.postalAddress.countryGeoId;
            this.shippingAddress.contactNumber = address.telecomNumber.contactNumber;
            this.shippingAddress.postalCode = address.postalAddress.postalCode;
            this.shippingAddress.stateProvinceGeoId = address.postalAddress.stateProvinceGeoId;
            this.shippingAddress.postalContactMechId = address.postalContactMechId;
            this.shippingAddress.telecomContactMechId = address.telecomContactMechId;
            this.getRegions(address.postalAddress.countryGeoId);
            this.responseMessage = "";
        },
        selectPaymentMethod: function(method) {
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
        hideModal: function(modalId) { $('#'+modalId).modal('hide'); },
        showModal: function(modalId) { $('#'+modalId).modal('show'); },
        changeShippingAddress: function(data) {
            this.shippingAddressSelect = data.postalAddress;
            this.shippingAddressSelect.contactNumber = data.telecomNumber.contactNumber;
        },
        cleanShippingAddress: function() { this.shippingAddress = {}; this.isUpdate = false; },
        cleanPaymentMethod: function() { this.paymentMethod = {}; this.isUpdate = false; }
    },
    components: { "product-image": storeComps.ProductImageTemplate },
    mounted: function() {
        // query: { url: 'checkout' }
        if (this.$root.apiKey == null) { 
            this.$router.push({ name: 'login'}); 
        } else {
            this.getCartShippingOptions();
            this.getCartInfo();
            this.getCustomerShippingAddresses();
            this.getCustomerPaymentMethods();
            this.getCountries();
        }
    }
};
storeComps.CheckOutPageTemplate = getPlaceholderRoute("template_client_checkout", "CheckOutPage");

storeComps.SuccessCheckOut = {
    name: "success-checkout",
    data: function() { return {
        ordersList:[], orderList:{},
        axiosConfig: { headers: { "Content-Type": "application/json;charset=UTF-8", "Access-Control-Allow-Origin": "*",
                "api_key":this.$root.apiKey, "moquiSessionToken":this.$root.moquiSessionToken } }
    }; },
    methods: {
        getCustomerOrders: function() {
            CustomerService.getCustomerOrders(this.axiosConfig)
                .then(function (data) { this.ordersList = data.orderInfoList; }.bind(this));
        },
        getCustomerOrderById: function() {
            CustomerService.getCustomerOrderById(this.$route.params.orderId,this.axiosConfig)
                .then(function (data) { this.orderList = data; }.bind(this));
        },
        formatDate: function(date) {
            return moment(date).format('Do MMM, YY');
        }
    },
    mounted: function() { this.getCustomerOrderById(); }
};
storeComps.SuccessCheckOutTemplate = getPlaceholderRoute("template_client_checkoutSuccess", "SuccessCheckOut");
