var DealsPage = {
  name: "deals-page",
  data () {
  	return {
      products: [],
      category: {}
    };
  },
  methods: {
    getProductsList() {
      const that = this;
      ProductService.getProductsByCategory(this.$route.params.categoryId).then(function (data) {
        that.products = data;
      });
    },
    getCategoryInfoById() {
      const that = this;
      ProductService.getCategoryInfoById(this.$route.params.categoryId).then(function (data) {
        that.category = data;
      });
    }
  },
  watch: {
    '$route' (to, from) {
      this.getProductsList();
      this.getCategoryInfoById();
    }
  },
  components: {
    landingProduct: LandingProductTemplate,
    navbar: NavbarTemplate,
    "footer-page": FooterPageTemplate
  },
  mounted() {
    this.getProductsList();
    this.getCategoryInfoById();
  }
};
var DealsPageTemplate = getPlaceholderRoute(
  "/store/components/pages/DealsPage/DealsPage.html",
  "DealsPage"
);