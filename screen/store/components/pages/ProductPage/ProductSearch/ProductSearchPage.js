storeComps.ProductSearch = {
  name: "product-search",
  data() { return { productList: [] }; },
  methods: { },
  beforeCreate() {
  	ProductService.getProductBySearch(this.$route.params.searchText,'PopcAllProducts').then(function (data){
        this.productList = data.productList;
    }.bind(this));
  },
  components: { landingProduct: storeComps.LandingProductTemplate, navbar: storeComps.NavbarTemplate, "footer-page": storeComps.FooterPageTemplate }
};
storeComps.ProductSearchTemplate = getPlaceholderRoute("searchTemplate", "ProductSearch");
