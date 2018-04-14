var SuccessCheckOut = {
  name: "success-checkout",
  data() {
    return {
      ordersList:[],
      orderList:{},
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
    getCustomerOrders() {
      CustomerService.getCustomerOrders(this.axiosConfig).then(data => {
        this.ordersList = data.orderInfoList;
      });
    },
    getCustomerOrderById() {
      CustomerService.getCustomerOrderById(this.$route.params.orderId,this.axiosConfig).then(data => {
        this.orderList = data;
      });
    },
    formatDate(date) {
      var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ];
      var date = new Date(date);
      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();
      return day + ' ' + monthNames[monthIndex] + ', ' + year;
    }
  },
  components: {
    "placeorder-navbar": PlaceOrderNavbarTemplate,
    "footer-page": FooterPageTemplate
  },
  mounted() {
    this.getCustomerOrderById();
  }
};
var SuccessCheckOutTemplate = getPlaceholderRoute(
  "./components/pages/CheckOutPage/SuccessCheckOut/SuccessCheckOut.html",
  "SuccessCheckOut"
);
