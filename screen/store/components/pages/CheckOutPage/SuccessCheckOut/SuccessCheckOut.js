storeComps.SuccessCheckOut = {
  name: "success-checkout",
  data() {
    return {
      ordersList:[],
      orderList:{},
      axiosConfig: {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "api_key":this.$root.apiKey,
          "moquiSessionToken":this.$root.moquiSessionToken
        }
      }
    };
  },
  methods: {
    getCustomerOrders() {
      CustomerService.getCustomerOrders(this.axiosConfig).then(function (data) {
        this.ordersList = data.orderInfoList;
      }.bind(this));
    },
    getCustomerOrderById() {
      CustomerService.getCustomerOrderById(this.$route.params.orderId,this.axiosConfig).then(function (data) {
        this.orderList = data;
      }.bind(this));
    },
    formatDate(date) {
      var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
      var date = new Date(date);
      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();
      return day + ' ' + monthNames[monthIndex] + ', ' + year;
    }
  },
  components: { "placeorder-navbar": storeComps.PlaceOrderNavbarTemplate, "footer-page": storeComps.FooterPageTemplate },
  mounted() { this.getCustomerOrderById(); }
};
storeComps.SuccessCheckOutTemplate = getPlaceholderRoute("checkoutSuccessTemplate", "SuccessCheckOut");
