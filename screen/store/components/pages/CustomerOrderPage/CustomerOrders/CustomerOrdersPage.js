var CustomerOrdersPage = {
  name: "customerorders-page",
  data() {
  	return {
      ordersList:[],
      listProduct:[],
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
    getCustomerOrderById(orderId) {
      CustomerService.getCustomerOrderById(orderId,this.axiosConfig).then(data => {
        this.listProduct = data.orderItemList;
      });
      return this.listProduct;
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
      return monthNames[monthIndex] + ' ' + day + ', ' + year;
    }
  },
  components : {
    navbar: NavbarTemplate,
  	"footer-page": FooterPageTemplate
  },
  mounted() {
    this.getCustomerOrders();
  }
};
var CustomerOrdersPageTemplate = getPlaceholderRoute(
  "./components/pages/CustomerOrderPage/CustomerOrders/CustomerOrdersPage.html",
  "CustomerOrdersPage"
);