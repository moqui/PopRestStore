var ProductSearch = {
  name: "product-search",
  data() {
  	return {
  	  productList: []	
  	};
  },
  methods: {
  },
  beforeCreate() {
  	ProductService.getProductBySearch(this.$route.params.searchText,'PopcAllProducts').then(function (data){
        this.productList = data.productList;
    }.bind(this));
  },
  components: {
  	landingProduct: LandingProductTemplate,
  	navbar: NavbarTemplate,
    "footer-page": FooterPageTemplate
  }
};

var ProductSearchTemplate = getPlaceholderRoute("/store/components/pages/ProductPage/ProductSearch/ProductSearchPage.html", "ProductSearch");