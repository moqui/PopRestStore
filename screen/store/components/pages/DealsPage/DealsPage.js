storeComps.DealsPage = {
  name: "deals-page",
  data () {
  	return {
      products: [],
      category: {}
    };
  },
  methods: {
    getProductsList() {
      ProductService.getProductsByCategory(this.$route.params.categoryId).then(function (data) {
        this.products = data;
      }.bind(this));
    },
    getCategoryInfoById() {
      ProductService.getCategoryInfoById(this.$route.params.categoryId).then(function (data) {
        this.category = data;
      }.bind(this));
    }
  },
  watch: {
    '$route' (to, from) {
      this.getProductsList();
      this.getCategoryInfoById();
    }
  },
  components: { landingProduct: storeComps.LandingProductTemplate, navbar: storeComps.NavbarTemplate, "footer-page": storeComps.FooterPageTemplate },
  mounted() { this.getProductsList(); this.getCategoryInfoById(); }
};
storeComps.DealsPageTemplate = getPlaceholderRoute("categoryTemplate", "DealsPage");
