/* This software is in the public domain under CC0 1.0 Universal plus a Grant of Patent License. */
storeComps.LoginPage = {
    name: "login",
    data: function() { return {
        user: {username: "", password: ""}, loginErrormessage: "",
        axiosConfig: { headers: { "Content-Type": "application/json;charset=UTF-8", "Access-Control-Allow-Origin": "*",
                "moquiSessionToken": this.$root.moquiSessionToken } }
    }; },
    computed: {
        apiKey: function() { return this.$root.apiKey }
    },
    methods: {
        login: function(event) {
            if (this.user.username.length < 3 || this.user.password.length < 3) {
                this.loginErrormessage = "You must type a valid Username and Password";
                return;
            }
            LoginService.login(this.user, this.axiosConfig).then(function (data) {
                this.$root.apiKey = data.apiKey;
                location.href = "/store";
            }.bind(this)).catch(function (error) { this.loginErrormessage = error.response.data.errors; }.bind(this));
        }
    },
    mounted: function() { if (this.$root.apiKey != null) { location.href = "/store"; } },
    components: {"placeorder-navbar": storeComps.PlaceOrderNavbarTemplate, "footer-page": storeComps.FooterPageTemplate}
};
storeComps.LoginPageTemplate = getPlaceholderRoute("loginTemplate", "LoginPage");

storeComps.ResetPasswordPage = {
    name: "reset-password",
    data: function() { return {
        data: { username: "" },
        passwordInfo: { username: "", oldPassword: "", newPassword: "", newPasswordVerify: "" },
        nextStep: 0, responseMessage: "",
        axiosConfig: { headers: { "Content-Type": "application/json;charset=UTF-8", "Access-Control-Allow-Origin": "*",
                "moquiSessionToken":this.$root.moquiSessionToken } }
    }; },
    methods: {
        resetPassword: function(event) {
            event.preventDefault();
            LoginService.resetPassword(this.data,this.axiosConfig).then(function (data) {
                this.nextStep = 1;
                this.responseMessage = "";
            }.bind(this)).catch(function (error) { this.responseMessage = error.response.data.errors; }.bind(this));
        },
        changePassword: function(event) {
            event.preventDefault();
            var expreg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,35}$/;
            if (!expreg.test(this.passwordInfo.newPassword)) {
                this.responseMessage = "The password must have at least 8 characters, a special character," +
                    " a lowercase letter, a capital letter and at least one number.";
                return;
            }

            if (this.passwordInfo.newPassword !== this.passwordInfo.newPasswordVerify) {
                this.responseMessage = "Passwords do not match";
                return;
            }
            this.passwordInfo.username = this.data.username;
            CustomerService.updateCustomerPassword(this.passwordInfo, this.axiosConfig).then(function (data) {
                this.responseMessage = data.messages;
                this.login();
            }.bind(this))
                .catch(function (error) {
                    this.responseMessage = error.response.data.errors;
                }.bind(this));
        },
        login: function() {
            var user = { username: this.passwordInfo.username, password: this.passwordInfo.newPassword };
            LoginService.login(user, this.axiosConfig).then(function (data) {
                this.$root.apiKey = data.apiKey;
                location.href ="/store";
            }.bind(this));
        }
    },
    components: { "footer-page": storeComps.FooterPageTemplate }
};
storeComps.ResetPasswordTemplate = getPlaceholderRoute("resetPasswordTemplate", "ResetPasswordPage");

storeComps.AccountPage = {
    name: "account-page",
    data: function() { return {
        customerInfo: {}, passwordInfo: {}, customerAddressList: [],
        countriesList: [], regionsList: [], localeList: [], timeZoneList: [],
        customerAddress: {}, addressOption: "", customerPaymentMethods: [],
        paymentAddressOption: {}, paymentOption: "", paymentMethod: {},
        responseMessage: "", isUpdate: false, message: { state: "", message: "" },
        axiosConfig: { headers: { "Content-Type": "application/json;charset=UTF-8", "Access-Control-Allow-Origin": "*",
                "api_key":this.$root.apiKey, "moquiSessionToken":this.$root.moquiSessionToken } }
    }; },
    methods: {
        getCustomerInfo: function() { CustomerService.getCustomerInfo(this.axiosConfig)
            .then(function (data) { this.customerInfo = data; }.bind(this)); },
        getCustomerAddress: function() { CustomerService.getShippingAddresses(this.axiosConfig)
            .then(function (data) { this.customerAddressList = data.postalAddressList; }.bind(this)); },
        getCustomerPaymentMethods: function() { CustomerService.getPaymentMethods(this.axiosConfig)
            .then(function (data) { this.customerPaymentMethods = data.methodInfoList; }.bind(this)); },
        addCustomerAddress: function() {
            if (this.customerAddress.toName == null || this.customerAddress.toName.trim() === "" ||
                this.customerAddress.countryGeoId == null || this.customerAddress.countryGeoId.trim() === "" ||
                this.customerAddress.city == null || this.customerAddress.city.trim() === "" ||
                this.customerAddress.address1 == null || this.customerAddress.address1.trim() === "" ||
                this.customerAddress.contactNumber == null || this.customerAddress.contactNumber.trim() === "") {
                this.responseMessage = "Verify the required fields";
                return;
            }
            if (this.customerAddress.postalCode.length < 5 || this.customerAddress.postalCode.length > 7) {
                this.responseMessage = "Type a valid postal code";
                return;
            }

            CustomerService.addShippingAddress(this.customerAddress,this.axiosConfig).then(function (data) {
                this.customerAddress = {};
                this.getCustomerAddress();
                this.hideModal("modal1");
                this.responseMessage = "";
            }.bind(this));
        },
        addCustomerPaymentMethod: function(event) {
            event.preventDefault();
            this.paymentMethod.paymentMethodTypeEnumId = "PmtCreditCard";

            if (this.paymentMethod.titleOnAccount == null || this.paymentMethod.titleOnAccount.trim() === "" ||
                this.paymentMethod.cardNumber == null || this.paymentMethod.cardNumber.trim() === "" ||
                this.paymentMethod.expireMonth == null || this.paymentMethod.expireMonth.trim() === "" ||
                this.paymentMethod.expireYear == null || this.paymentMethod.expireYear.trim() === "" ||
                this.paymentMethod.cardSecurityCode == null || this.paymentMethod.cardSecurityCode.trim() === "" ||
                this.paymentMethod.address1 == null || this.paymentMethod.address1.trim() === "" ||
                this.paymentMethod.toName == null || this.paymentMethod.toName.trim() === "" ||
                this.paymentMethod.city == null || this.paymentMethod.city.trim() === "" ||
                this.paymentMethod.countryGeoId == null || this.paymentMethod.countryGeoId.trim() === "" ||
                this.paymentMethod.contactNumber == null || this.paymentMethod.contactNumber.trim() === "") {
                this.responseMessage = "Verify the required fields";
                return;
            }
            if (this.paymentMethod.postalCode.length < 5 || this.paymentMethod.postalCode.length > 7) {
                this.responseMessage = "Type a valid postal code";
                return;
            }
            if (this.paymentMethod.cardNumber.startsWith("5")) {
                this.paymentMethod.creditCardTypeEnumId = "CctMastercard";
            } else if (this.paymentMethod.cardNumber.startsWith("4")){
                this.paymentMethod.creditCardTypeEnumId = "CctVisa";
            }
            if (this.paymentMethod.cardSecurityCode.length < 3 || this.paymentMethod.cardSecurityCode.length > 4) {
                this.responseMessage = "Must type a valid CSC";
                return;
            }
            if (this.paymentMethod.postalContactMechId == null) {
                this.paymentMethod.postalContactMechId = this.paymentAddressOption.postalContactMechId;
                this.paymentMethod.telecomContactMechId = this.paymentAddressOption.telecomContactMechId;
            }
            if (this.isUpdate) { this.paymentMethod.cardNumber = ""; }

            CustomerService.addPaymentMethod(this.paymentMethod,this.axiosConfig).then(function (data) {
                this.hideModal("modal2");
                this.paymentMethod = {};
                this.getCustomerPaymentMethods();
                this.responseMessage = "";
                this.paymentAddressOption = {};
            }.bind(this));
        },
        resetData: function() {
            this.paymentMethod = {};
            this.customerAddress = {};
            this.paymentAddressOption = {};
            this.isUpdate = false;
        },
        updateCustomerInfo: function() {
            if(this.customerInfo.username == null || this.customerInfo.username.trim() === ""
                  || this.customerInfo.firstName == null || this.customerInfo.firstName.trim() === ""
                  || this.customerInfo.lastName == null || this.customerInfo.lastName.trim() === ""
                  || this.customerInfo.emailAddress == null || this.customerInfo.emailAddress.trim() === ""
                  || this.customerInfo.locale == null || this.customerInfo.locale.trim() === ""
                  || this.customerInfo.timeZone == null || this.customerInfo.timeZone.trim() === "") {
                this.message.state = 2;
                this.message.message = "Verify the required fields";
                return;
            }
            CustomerService.updateCustomerInfo(this.customerInfo,this.axiosConfig).then(function (data) {
                this.customerInfo = data.customerInfo;
                this.message.state = 1;
                this.message.message = "Correct! Your data has been updated.";
            }.bind(this));
        },
        updateCustomerPassword: function(event) {
            event.preventDefault();
            var expreg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%.*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,35}$/;
            if (!expreg.test(this.passwordInfo.newPassword)) {
                this.responseMessage = "The password must have at least 8 characters, a special character," +
                    " a lowercase letter, a capital letter and at least one number.";
                return;
            }

            if (this.passwordInfo.newPassword !== this.passwordInfo.newPasswordVerify) {
                this.responseMessage = "Passwords do not match";
                return;
            }

            this.passwordInfo.userId = this.customerInfo.userId;

            CustomerService.updateCustomerPassword(this.passwordInfo,this.axiosConfig).then(function (data) {
                this.responseMessage = data.messages.replace("null",this.customerInfo.username);
                this.passwordInfo = {};
            }.bind(this)).catch(function (error) {
                    this.responseMessage = "An error occurred: " + error.response.data.errors;
            }.bind(this));
        },
        scrollTo: function(refName) {
            if (refName == null) {
                window.scrollTo(0, 0);
            } else {
                var element = this.$refs[refName];
                var top = element.offsetTop;
                window.scrollTo(0, top);
            }
        },
        deletePaymentMethod: function(paymentMethodId) {
            CustomerService.deletePaymentMethod(paymentMethodId,this.axiosConfig).then(function (data) {
                this.getCustomerPaymentMethods();
                this.hideModal("modal5");
            }.bind(this));
        },
        deleteShippingAddress: function(contactMechId,contactMechPurposeId) {
            CustomerService.deleteShippingAddress(contactMechId,contactMechPurposeId, this.axiosConfig).then(function (data) {
                this.getCustomerAddress();
                this.hideModal("modal4");
            }.bind(this));
        },
        getCountries: function() { GeoService.getCountries().then(function (data) { this.countriesList = data.geoList; }.bind(this)); },
        getRegions: function(geoId) { GeoService.getRegions(geoId).then(function (data){ this.regionsList = data.resultList; }.bind(this)); },
        getLocale: function() { GeoService.getLocale().then(function (data) { this.localeList = data.localeStringList; }.bind(this)); },
        getTimeZone: function() { GeoService.getTimeZone().then(function (data) { this.timeZoneList = data.timeZoneList; }.bind(this)); },
        selectAddress: function(address) {
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
            this.customerAddress.postalContactMechPurposeId = address.postalContactMechPurposeId;
            this.responseMessage = "";
            if (this.customerAddress.countryGeoId != null){
                this.getRegions(this.customerAddress.countryGeoId);
            }
        },
        selectBillingAddress: function(address) {
            if (address != 0) {
                this.paymentMethod.address1 = address.postalAddress.address1;
                this.paymentMethod.address2 = address.postalAddress.address2;
                this.paymentMethod.toName = address.postalAddress.toName;
                this.paymentMethod.city = address.postalAddress.city;
                this.paymentMethod.countryGeoId = address.postalAddress.countryGeoId;
                this.paymentMethod.contactNumber = address.telecomNumber.contactNumber;
                this.paymentMethod.postalCode = address.postalAddress.postalCode;
                this.paymentMethod.stateProvinceGeoId = address.postalAddress.stateProvinceGeoId;
                this.responseMessage = "";
                this.getRegions(this.paymentMethod.countryGeoId);
            } else {
                this.paymentMethod.address1 = "";
                this.paymentMethod.address2 = "";
                this.paymentMethod.toName = "";
                this.paymentMethod.city = "";
                this.paymentMethod.countryGeoId = "";
                this.paymentMethod.contactNumber = "";
                this.paymentMethod.postalCode = "";
                this.paymentMethod.stateProvinceGeoId = "";
            }
        },
        selectPaymentMethod: function(method) {
            this.paymentMethod = {};
            this.paymentMethod.paymentMethodId = method.paymentMethodId;
            this.paymentMethod.paymentMethodTypeEnumId = method.paymentMethod.PmtCreditCard;
            this.paymentMethod.cardNumber = method.creditCard.cardNumber;
            this.paymentMethod.titleOnAccount = method.paymentMethod.titleOnAccount;
            this.paymentMethod.expireMonth = method.expireMonth;
            this.paymentMethod.expireYear = method.expireYear;
            this.paymentMethod.postalContactMechId = method.paymentMethod.postalContactMechId;
            this.paymentMethod.telecomContactMechId = method.paymentMethod.telecomContactMechId;

            this.paymentMethod.address1 = method.postalAddress.address1;
            this.paymentMethod.address2 = method.postalAddress.address2;
            this.paymentMethod.toName = method.postalAddress.toName;
            this.paymentMethod.city = method.postalAddress.city;
            this.paymentMethod.countryGeoId = method.postalAddress.countryGeoId;
            this.paymentMethod.contactNumber = method.telecomNumber.contactNumber;
            this.paymentMethod.postalCode = method.postalAddress.postalCode;
            this.paymentMethod.stateProvinceGeoId = method.postalAddress.stateProvinceGeoId;

            this.getRegions(this.paymentMethod.countryGeoId);

            this.paymentMethod.cardSecurityCode = "";
            this.responseMessage = "";
        },
        hideModal: function(modalid) { $('#'+modalid).modal('hide'); }
    },
    components: { navbar: storeComps.NavbarTemplate, "footer-page": storeComps.FooterPageTemplate },
    mounted() {
        if (this.$root.apiKey == null) {
            this.$router.push({ name: 'landing'});
        } else {
            this.getCustomerInfo();
            this.getCustomerAddress();
            this.getCustomerPaymentMethods();
            this.getCountries();
            this.getRegions();
            this.getLocale();
            this.getTimeZone();
        }
    }
};
storeComps.AccountPageTemplate = getPlaceholderRoute("accountTemplate", "AccountPage");

storeComps.CreateAccountPage = {
    name: "create-account",
    data: function() { return {
        accountInfo: {}, confirmPassword: "", errorMessage: "",
        axiosConfig: { headers: { "Content-Type": "application/json;charset=UTF-8", "Access-Control-Allow-Origin": "*",
                "moquiSessionToken":this.$root.moquiSessionToken } }
    }; },
    methods: {
        createAccount: function(event){
            event.preventDefault();
            var emailValidation = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            var expreg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%.*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,35}$/;

            if (this.accountInfo.firstName == null ||  this.accountInfo.firstName.trim() === ""
                  || this.accountInfo.lastName == null || this.accountInfo.lastName.trim() === ""
                  || this.accountInfo.emailAddress == null || this.accountInfo.emailAddress.trim() === ""
                  || this.accountInfo.newPassword == null || this.accountInfo.newPassword.trim() === ""
                  || this.confirmPassword == null || this.confirmPassword.trim() === "") {
                this.errorMessage = "Verify the required fields";
                return;
            }
            if (!expreg.test(this.accountInfo.newPassword)) {
                this.errorMessage = "The password must have at least 8 characters, a special character, a lowercase letter, a capital letter and at least one number.";
                return;
            }
            if (!emailValidation.test(this.accountInfo.emailAddress)) {
                this.errorMessage = "Insert a valid email.";
                return;
            }
            if (this.accountInfo.newPassword.includes("<") || this.accountInfo.newPassword.includes(">")) {
                this.errorMessage = "The Password can not contain the character < or > ";
                return;
            }
            if (this.accountInfo.newPassword !== this.confirmPassword) {
                this.errorMessage = "Passwords do not match";
                return;
            }

            this.accountInfo.newPasswordVerify = this.confirmPassword;

            LoginService.createAccount(this.accountInfo, this.axiosConfig).then(function (data) {
                this.login(this.accountInfo.emailAddress, this.accountInfo.newPassword);
            }.bind(this)).catch(function (error) {
                this.errorMessage = "An error occurred: " + error.response.data.errors;
            }.bind(this));
        },
        login: function(userName, password) {
            var user = { username: userName, password: password };
            LoginService.login(user, this.axiosConfig).then(function (data) {
                this.$root.apiKey = data.apiKey;
                location.href ="/store";
            }.bind(this)).catch(function (error) {
                this.errorMessage = error.response.data.errors;
            }.bind(this));
        }
    },
    mounted: function() { if(this.$root.apiKey != null) { this.$router.push({ name: 'landing' }); } },
    components: { "footer-page": storeComps.FooterPageTemplate }
};
storeComps.CreateAccountPageTemplate = getPlaceholderRoute("accountCreateTemplate", "CreateAccountPage");

storeComps.CustomerOrderPage = {
    name: "customerorder-page",
    data: function() { return {
        ordersList: [], orderList: {},
        axiosConfig: { headers: { "Content-Type": "application/json;charset=UTF-8", "Access-Control-Allow-Origin": "*",
                "api_key":this.$root.apiKey, "moquiSessionToken":this.$root.moquiSessionToken } }
    }; },
    methods: {
        getCustomerOrderById: function() {
            CustomerService.getCustomerOrderById(this.$route.params.orderId,this.axiosConfig).then(function (data) {
                this.orderList = data;
            }.bind(this));
        },
        formatDate: function(dateArg) {
            var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
            var date = new Date(dateArg);
            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();
            return day + ' ' + monthNames[monthIndex] + ', ' + year;
        }
    },
    components: { navbar: storeComps.NavbarTemplate, "footer-page": storeComps.FooterPageTemplate },
    mounted: function() { this.getCustomerOrderById(); }
};
storeComps.CustomerOrderPageTemplate = getPlaceholderRoute("orderDetailTemplate", "CustomerOrderPage");

storeComps.CustomerOrdersPage = {
    name: "customerorders-page",
    data: function() { return {
        ordersList: [], listProduct: [],
        axiosConfig: { headers: { "Content-Type": "application/json;charset=UTF-8", "Access-Control-Allow-Origin": "*",
                "api_key":this.$root.apiKey, "moquiSessionToken":this.$root.moquiSessionToken } }
    }; },
    methods: {
        getCustomerOrders: function() {
            CustomerService.getCustomerOrders(this.axiosConfig).then(function (data) {
                this.ordersList = data.orderInfoList;
                this.getCustomerOrderById();
            }.bind(this));
        },
        getCustomerOrderById: function() {
            for (var x in this.ordersList) {
                CustomerService.getCustomerOrderById(this.ordersList[x].orderId,this.axiosConfig).then(function (data) {
                    var product = {
                        "orderId":data.orderItemList[0].orderId,
                        "listProduct":data.orderItemList
                    };
                    this.listProduct.push(product);
                }.bind(this));
            }
        },
        scrollTo: function(refName) {
            if (refName == null) {
                window.scrollTo(0, 0);
            } else {
                var element = this.$refs[refName];
                var top = element.offsetTop;
                window.scrollTo(0, top);
            }
        },
        formatDate: function(date) {
            var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
            var date = new Date(date);
            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();
            return monthNames[monthIndex] + ' ' + day + ', ' + year;
        }
    },
    components : { navbar: storeComps.NavbarTemplate, "footer-page": storeComps.FooterPageTemplate },
    mounted: function() { this.getCustomerOrders(); }
};
storeComps.CustomerOrdersPageTemplate = getPlaceholderRoute("orderHistoryTemplate", "CustomerOrdersPage");
