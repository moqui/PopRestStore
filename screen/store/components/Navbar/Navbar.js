var Navbar = {
  name: "navbar",
  data() {
    return {
      customerInfo: {},
      productsQuantity: "",
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
  props: ["subBar"],
  components: {
    "search-input": SearchInputTemplate
  },
  computed: Vuex.mapGetters({
    categories: "categories"
  }),
  methods: {
    getCustomerInfo() {
      CustomerService.getCustomerInfo(this.axiosConfig).then(function (data) {
        this.customerInfo = data;
      }.bind(this))
      .catch(function (error)  {
        console.log('An error has occurred' + error);
      });
    },
    getCartInfo() {
      ProductService.getCartInfo(this.axiosConfig).then(function (data) {
        this.productsQuantity = data.orderItemList ? data.orderItemList.length : 0;
      }.bind(this));
    },
    logout() {
      LoginService.logout().then(function (data) {
        storeInfo = {};
        location.reload();
        this.$router.push({ name: 'login'});
      }.bind(this));
    },
  },
  mounted() {
    if(storeInfo.apiKey != null){
      this.getCustomerInfo();
    }
    this.getCartInfo();
  },
  created() {
    this.$store.dispatch("getAllCategories");
  }
};

var NavbarTemplate = getPlaceholderRoute("/store/components/Navbar/Navbar.html", "Navbar", Navbar.props);
