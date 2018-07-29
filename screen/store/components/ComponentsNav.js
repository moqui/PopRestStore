/* This software is in the public domain under CC0 1.0 Universal plus a Grant of Patent License. */
storeComps.Navbar = {
  name: "navbar",
  data: function() { return {
      customerInfo: {}, categories: [], searchText: "", productsQuantity: "",
      axiosConfig: { headers: { "Content-Type": "application/json;charset=UTF-8", "Access-Control-Allow-Origin": "*",
              "api_key":this.$root.apiKey, "moquiSessionToken":this.$root.moquiSessionToken } }
  }; },
  props: ["subBar"],
  methods: {
      // TODO: use customerInfo in $root from initial data load in config.js instead of doing another request
    getCustomerInfo: function() { CustomerService.getCustomerInfo(this.axiosConfig).then(function (data) {
        this.customerInfo = data;
    }.bind(this)).catch(function (error)  { console.log('An error has occurred' + error); }); },
    getCartInfo: function() { ProductService.getCartInfo(this.axiosConfig).then(function (data) {
        this.productsQuantity = data.orderItemList ? data.orderItemList.length : 0;
    }.bind(this)); },
    logout: function() { LoginService.logout().then(function (data) {
        storeInfo = {};
        location.reload();
        this.$router.push({ name: 'login'});
    }.bind(this)); },
    searchProduct: function() { this.$router.push({ name: 'search', params: { searchText: this.searchText }}); }
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
storeComps.NavbarTemplate = getPlaceholderRoute("template_client_header", "Navbar", storeComps.Navbar.props);
Vue.component("navbar", storeComps.NavbarTemplate);

storeComps.FooterPage = {
    name: "footer-page",
    data() { return {}; },
    props: ["infoLink"]
};
storeComps.FooterPageTemplate = getPlaceholderRoute("template_client_footer", "FooterPage", storeComps.FooterPage.props);
Vue.component("footer-page", storeComps.FooterPageTemplate);
