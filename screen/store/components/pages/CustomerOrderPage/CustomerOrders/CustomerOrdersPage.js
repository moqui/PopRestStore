var CustomerOrdersPage = {
  name: "customerorders-page",
  data() {
  	return {
      ordersList:[],
      listProduct: [],
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
      const that = this;
      CustomerService.getCustomerOrders(this.axiosConfig).then(function (data) {
        that.ordersList = data.orderInfoList;
        that.getCustomerOrderById();
      });
    },
    getCustomerOrderById() {
      const that = this;
      for(var x in this.ordersList) {
        CustomerService.getCustomerOrderById(this.ordersList[x].orderId,this.axiosConfig).then(function (data) {
          var product = {
            "orderId":data.orderItemList[0].orderId,
            "listProduct":data.orderItemList
          };
          that.listProduct.push(product);
        });
      }
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
  "/store/components/pages/CustomerOrderPage/CustomerOrders/CustomerOrdersPage.html",
  "CustomerOrdersPage"
);
