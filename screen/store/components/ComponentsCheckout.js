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
            homePath: "", customerInfo: {}, productsInCart: [], shippingAddress: {}, shippingAddressSelect: {}, paymentMethod: {}, shippingMethod: {}, showProp65: "false",
            billingAddress: {}, billingAddressOption: "", listShippingAddress: [], listPaymentMethods: [],  promoCode: "", promoError: "",
            countriesList: [], regionsList: [], shippingOption: "", addressOption: "", paymentOption: "", isSameAddress: "0",
            isUpdate: false, isSpinner: false, responseMessage: "", toNameErrorMessage: "", countryErrorMessage: "", addressErrorMessage: "", 
            cityErrorMessage: "", stateErrorMessage: "", postalCodeErrorMessage: "", contactNumberErrorMessage: "", paymentId: {}, urlList: {}, 
            freeShipping:false, promoSuccess: "", stateGuestCustomer:2, selectShippingAddressStatus: 'active', selectShippingMethodStatus:0, selectPaymentMethodStatus:0, placeOrderStatus:0,
            listShippingOptions: [], optionNavbar:1, axiosConfig: { headers: { "Content-Type": "application/json;charset=UTF-8", "Access-Control-Allow-Origin": "*",
            "api_key":this.$root.apiKey, "moquiSessionToken":this.$root.moquiSessionToken } }
        }; 
    },
    computed: {
        shippingItemPrice: function() {
            var item = this.productsInCart.orderItemList?this.productsInCart.orderItemList.find(function(item) {
                return item.itemTypeEnumId == 'ItemShipping'; }):0;
            return item ? item.unitAmount : 0;
        }
    },
    methods: {
        notAddressSeleted: function() {
            return (this.addressOption == null || this.addressOption == '' 
                || this.listShippingAddress == null || this.listShippingAddress.length == 0);
        },
        notPaymentSeleted: function() {
            return (this.paymentOption == null || this.paymentOption == '' 
                || this.listPaymentMethods == null || this.listPaymentMethods.length == 0);
        },
        getCustomerInfo: function() { CustomerService.getCustomerInfo(this.axiosConfig)
            .then(function (data) { this.customerInfo = data; }.bind(this)); },
        getCustomerShippingAddresses: function() {
            CustomerService.getShippingAddresses(this.axiosConfig).then(function (data) {
                this.listShippingAddress = data.postalAddressList;
            }.bind(this));
        },
        resetData: function() {
            this.paymentMethod = {};
            this.shippingAddress = {};
            this.isUpdate = false;
            this.shippingAddress.countryGeoId = 'USA';
        },

        onAddressCancel: function() {
            this.hideModal("addressFormModal");
        },

        onAddressUpserted: function(data) {
            this.shippingAddress = {};
            this.addressOption = data.postalContactMechId + ':' + data.telecomContactMechId;
            console.log(this.addressOption);
            this.getCustomerShippingAddresses();
            this.hideModal("addressFormModal");
        },

        onCreditCardCancel: function() {
            this.hideModal("creditCardModal");
        },

        /**
         * Data is like so: 
         * "postalContactMechId" : "CustJqpAddr",
         * "paymentMethodId" : "100004",
         * "telecomContactMechId" : "CustJqpTeln"
        **/
        onCreditCardSet: function(data) {
            this.getCustomerPaymentMethods();
            this.hideModal("creditCardModal");
        },

        getCartShippingOptions: function() {
            ProductService.getCartShippingOptions(this.axiosConfig)
                .then(function (data) { this.listShippingOptions = data.shippingOptions;}.bind(this));
        },
        getRegions: function(geoId) { GeoService.getRegions(geoId).then(function (data){ this.regionsList = data.resultList; }.bind(this)); },
        getCartInfo: function() {
            ProductService.getCartInfo(this.axiosConfig).then(function (data) {
                if (data.postalAddress) {
                    this.postalAddressStateGeoSelected = data.postalAddressStateGeo;
                    this.addressOption = data.postalAddress.contactMechId + ':' + data.postalAddress.telecomContactMechId;
                    this.shippingAddressSelect = data.postalAddress;
                    this.shippingAddressSelect.contactNumber = data.telecomNumber.contactNumber;
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
                this.afterDelete();
            }.bind(this));
        },
        addCartBillingShipping: function(){
            var info = {
                "shippingPostalContactMechId":this.addressOption.split(':')[0], 
                "shippingTelecomContactMechId":this.addressOption.split(':')[1],
                "paymentMethodId":this.paymentOption, 
                "carrierPartyId":this.shippingOption.split(':')[0], 
                "shipmentMethodEnumId":this.shippingOption.split(':')[1]
            };
            ProductService.addCartBillingShipping(info,this.axiosConfig).then(function (data) {
                this.paymentId = data;
                this.getCartInfo();
            }.bind(this));
        },
        setCheckoutStepActive: function(step) { 
            switch (step){
                case "selectShippingAddress":
                    this.selectShippingAddressStatus = "active";
                    $('#shippingAddressCollapse').collapse("show");
                    break;
                case "selectShippingMethod":
                    this.selectShippingMethodStatus = "active";
                    $('#shippingMethodCollapse').collapse("show");
                    break;
                case "selectPaymentMethod":
                    this.selectPaymentMethodStatus = "active";
                    $('#paymentMethodCollapse').collapse("show");
                    break;
                case "placeOrder":
                    this.placeOrderStatus = "active";
                    $('#placeOrderCollapse').collapse("show");
                    break;  
            }
        },
        setCheckoutStepComplete: function(step) { 
            switch (step){
                case "selectShippingAddress":
                    this.selectShippingAddressStatus = "complete";
                    break;
                case "selectShippingMethod":
                    this.selectShippingMethodStatus = "complete";
                    break;
                case "selectPaymentMethod":
                    this.selectPaymentMethodStatus = "complete";
                    break;
                case "placeOrder":
                    this.placeOrderStatus = "complete";
                    break;  
            }
        },    
        setOptionNavbar: function(option) { 
            this.optionNavbar = option; 
        },
        getCustomerPaymentMethods: function() {
            CustomerService.getPaymentMethods(this.axiosConfig)
                .then(function (data) { this.listPaymentMethods = data.methodInfoList; }.bind(this));
        },
        placeCartOrder: function() {
            var data = { "cardSecurityCodeByPaymentId": this.paymentId };
            this.isSpinner = true;
            ProductService.placeCartOrder(data,this.axiosConfig).then(function (data) {
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
        applyPromotionCode: function() {
            var dataCode = {promoCode: this.promoCode, orderId: this.productsInCart.orderHeader.orderId};
            ProductService.addPromoCode(dataCode,this.axiosConfig).then(function (data) {
                if(data.messages.includes("not valid")) {
                    this.promoError = data.messages;
                } else {
                    this.promoSuccess = data.messages;
                }
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
        afterDelete: function(){       
            let qtyProducts = 0 ;
            this.productsInCart.orderItemList.forEach(function(item){
                if(item.itemTypeEnumId == 'ItemProduct'){
                    qtyProducts = qtyProducts + 1;
                }
            });
            if(qtyProducts == 0){
                window.location.href = "/rc/category/RchAllProducts?pageSize=100";
            }   
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
            if(typeof(address.telecomNumber) != 'undefined') {
                this.paymentMethod.contactNumber = address.telecomNumber.contactNumber;
            }
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
            this.postalAddressStateGeoSelected = {geoName: data.postalAddressStateGeo.geoName};
        },
        cleanShippingAddress: function() { this.shippingAddress = {}; this.isUpdate = false; },
        cleanPaymentMethod: function() { this.paymentMethod = {}; this.isUpdate = false; }
    },
    components: { "product-image": storeComps.ProductImageTemplate },
    mounted: function() {
        if (this.$root.apiKey == null) { 
            this.$router.push({ name: 'login'}); 
        } else {
            this.homePath = storeConfig.homePath;
            this.showProp65 = storeConfig.show_prop_65_warning;
            this.getCustomerInfo();
            this.getCartShippingOptions();
            this.getCartInfo();
            this.getCustomerShippingAddresses();
            this.getCustomerPaymentMethods();
            this.getRegions('USA');
        }
    }
};
storeComps.CheckOutPageTemplate = getPlaceholderRoute("template_client_checkout", "CheckOutPage");

storeComps.SuccessCheckOut = {
    name: "success-checkout",
    data: function() { return {
        customerInfo: {}, deliveryPrice:0, ordersList:[], orderList:{},
        axiosConfig: { headers: { "Content-Type": "application/json;charset=UTF-8", "Access-Control-Allow-Origin": "*",
                "api_key":this.$root.apiKey, "moquiSessionToken":this.$root.moquiSessionToken } }
    }; },
    methods: {
        getCustomerInfo: function() { CustomerService.getCustomerInfo(this.axiosConfig)
            .then(function (data) { this.customerInfo = data; }.bind(this)); },
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
    components: { "product-image": storeComps.ProductImageTemplate },
    mounted: function() {
        this.homePath = storeConfig.homePath;
        this.getCustomerInfo();
        this.getCustomerOrderById();
    }
};
storeComps.SuccessCheckOutTemplate = getPlaceholderRoute("template_client_checkoutSuccess", "SuccessCheckOut");

storeComps.CheckoutContactInfoTemplate = getPlaceholderRoute("template_client_contactInfo", "contactInfo");
Vue.component("contact-info", storeComps.CheckoutContactInfoTemplate);

storeComps.CheckoutProp65Template = getPlaceholderRoute("template_client_prop65", "prop65Warning");
Vue.component("prop65-warning", storeComps.CheckoutProp65Template);