storeComps.CustomerOrdersPage = {
  name: "customerorders-page",
  data() {
  	return {
      ordersList:[],
      listProduct: [],
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
        this.getCustomerOrderById();
      }.bind(this));
    },
    getCustomerOrderById() {
      for(var x in this.ordersList) {
        CustomerService.getCustomerOrderById(this.ordersList[x].orderId,this.axiosConfig).then(function (data) {
          var product = {
            "orderId":data.orderItemList[0].orderId,
            "listProduct":data.orderItemList
          };
          this.listProduct.push(product);
        }.bind(this));
      }
    },
    scrollTo(refName) {
      if(refName == null) {
        window.scrollTo(0, 0);
      }else {
        var element = this.$refs[refName];
        var top = element.offsetTop;
        window.scrollTo(0, top);
      }
    },
    formatDate(date) {
      var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
      var date = new Date(date);
      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();
      return monthNames[monthIndex] + ' ' + day + ', ' + year;
    }
  },
  components : { navbar: storeComps.NavbarTemplate, "footer-page": storeComps.FooterPageTemplate },
  mounted() { this.getCustomerOrders(); }
};
storeComps.CustomerOrdersPageTemplate = getPlaceholderRoute("orderHistoryTemplate", "CustomerOrdersPage");
