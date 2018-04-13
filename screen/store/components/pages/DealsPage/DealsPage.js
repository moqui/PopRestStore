var DealsPage = {
  name: "deals-page",
  data () {
  	return {
      products: []
    };
  },
  methods: {
    getProductsList() {
      ProductService.getFeaturedProducts().then(data => {
        this.products = data;
      });
    }
  },
  components: {
    landingProduct: LandingProductTemplate,
    navbar: NavbarTemplate,
    "footer-page": FooterPageTemplate
  },
  mounted() {
    this.getProductsList();
  }
};
var DealsPageTemplate = getPlaceholderRoute(
  "./components/pages/DealsPage/DealsPage.html",
  "DealsPage"
);