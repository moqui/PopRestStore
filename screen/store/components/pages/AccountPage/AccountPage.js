var AccountPage = {
  name: "account-page",
  data() {
  	return {
      customerInfo: {},
      customerAddressList: [],
      customerAddress: {},
      customerPaymentMethods: [],
      addressOption: "",
      paymentOption: "",
      paymentMethod: {},
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
      CustomerService.addPaymentMethod(this.paymentMethod,this.axiosConfig).then(function (data) {
        this.hideModal("modal2");
        this.paymentMethod = {};
        this.getCustomerPaymentMethods();
      }.bind(this));
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
    this.getCustomerInfo();
    this.getCustomerAddress();
    this.getCustomerPaymentMethods();
  } 
};
var AccountPageTemplate = getPlaceholderRoute(
  "/store/components/pages/AccountPage/AccountPage.html",
  "AccountPage"
);
