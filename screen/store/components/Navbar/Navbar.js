var Navbar = {
  name: "navbar",
  data() {
    return {
      customerInfo: {},
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
    logout() {
      LoginService.logout().then(function (data) {
        this.$router.push({ name: 'Products'});
      });
    },
  },
  mounted() {
    if(storeInfo.apiKey != null){
      this.getCustomerInfo();
    }
  },
  created() {
    this.$store.dispatch("getAllCategories");
  }
};

var NavbarTemplate = getPlaceholderRoute("/store/components/Navbar/Navbar.html", "Navbar", Navbar.props);
