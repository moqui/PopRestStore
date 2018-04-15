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
      ProductService.getProductsByCategory(this.$route.params.categoryId).then(data => {
        this.products = data;
      });
    },
    getCategoryInfoById() {
      ProductService.getCategoryInfoById(this.$route.params.categoryId).then(data => {
        this.category = data;
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
