storeComps.Navbar = {
  name: "navbar",
  data: function() { return {
      customerInfo: {}, categories: [],
      productsQuantity: "",
      axiosConfig: { headers: { "Content-Type": "application/json;charset=UTF-8", "Access-Control-Allow-Origin": "*",
              "api_key":this.$root.apiKey, "moquiSessionToken":this.$root.moquiSessionToken } }
  }; },
  props: ["subBar"],
  components: { "search-input": storeComps.SearchInputTemplate },
  methods: {
    getCustomerInfo: function() {
      // TODO: use customerInfo in $root from initial data load in config.js instead of doing another request
      CustomerService.getCustomerInfo(this.axiosConfig).then(function (data) {
        this.customerInfo = data;
      }.bind(this))
      .catch(function (error)  {
        console.log('An error has occurred' + error);
      });
    },
    getCartInfo: function() {
      ProductService.getCartInfo(this.axiosConfig).then(function (data) {
        this.productsQuantity = data.orderItemList ? data.orderItemList.length : 0;
      }.bind(this));
    },
    logout: function() {
      LoginService.logout().then(function (data) {
        storeInfo = {};
        location.reload();
        this.$router.push({ name: 'login'});
      }.bind(this));
    }
  },
  mounted: function() {
      var vm = this;
      var storeInfo = this.$root.storeInfo;
      if (storeInfo.categoryByType && storeInfo.categoryByType.PsctBrowseRoot && storeInfo.categoryByType.PsctBrowseRoot.productCategoryId) {
        ProductService.getSubCategories(storeInfo.categoryByType.PsctBrowseRoot.productCategoryId).then(function(categories) { vm.categories = categories; }); }
      if (this.$root.apiKey != null) { this.getCustomerInfo(); }
      this.getCartInfo();
  }
};
storeComps.NavbarTemplate = getPlaceholderRoute("navbarTemplate", "Navbar", storeComps.Navbar.props);
