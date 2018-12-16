/* This software is in the public domain under CC0 1.0 Universal plus a Grant of Patent License. */
storeComps.Navbar = {
  name: "navbar",
  data: function() { return {
      homePath : this.$root.storeConfig.homePath, 
      customerInfo: {}, categories: [], searchText: "", productsQuantity: 0, storeInfo: [],
      axiosConfig: { headers: { "Content-Type": "application/json;charset=UTF-8", "Access-Control-Allow-Origin": "*",
              "api_key":this.$root.apiKey, "moquiSessionToken":this.$root.moquiSessionToken } }
  }; },
  props: ["subBar"],
  methods: {
    getCustomerInfo: function() { CustomerService.getCustomerInfo(this.axiosConfig).then(function (data) {
        this.customerInfo = data;
    }.bind(this)).catch(function (error)  { console.log('An error has occurred' + error); }); },
    getCartInfo: function() { ProductService.getCartInfo(this.axiosConfig).then(function (data) {
        //this.productsQuantity = data.orderItemList ? data.orderItemList.length : 0;
        if(typeof(data.orderItemList) == 'undefined') return;
        for(var i = 0; i < data.orderItemList.length; i++) {
            if(data.orderItemList[i].itemTypeEnumId == 'ItemProduct') {
                this.productsQuantity = data.orderItemList[i].quantity + this.productsQuantity;
            }
        }
    }.bind(this)); },
    logout: function() { LoginService.logout().then(function (data) {
        location.reload();
    }.bind(this)); },
    searchProduct: function() { location.href ="/store/search/"+this.searchText; }
  },
  created() {
      this.storeInfo = this.$root.storeInfo;
  },
  mounted: function() {
      var vm = this;
      if (this.storeInfo.categoryByType && this.storeInfo.categoryByType.PsctBrowseRoot && this.storeInfo.categoryByType.PsctBrowseRoot.productCategoryId) {
        ProductService.getSubCategories(this.storeInfo.categoryByType.PsctBrowseRoot.productCategoryId).then(function(categories) { vm.categories = categories; }); }
      if (this.$root.apiKey != null) { 
          if(this.$root.customerInfo != null){
              this.customerInfo = this.$root.customerInfo;
          } else {
              this.getCustomerInfo();
          } 
        }
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

storeComps.MenuLeft = {
    name: "menu-left",
    data() { return {}; },
    props: ["type"]
};
storeComps.MenuLeftTemplate = getPlaceholderRoute("template_client_menu", "MenuLeft", storeComps.MenuLeft.props);
Vue.component("menu-left", storeComps.MenuLeftTemplate);
