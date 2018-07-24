storeComps.Search = {
  name: "product-search",
  data: function() { return { productList: [] }; },
  methods: {
      doSearch: function() {
          // TODO: hard coded category ID
          ProductService.getProductBySearch(this.$route.params.searchText,'PopcAllProducts').then(function (data){
              this.productList = data.productList;
          }.bind(this));
      }
  },
  mounted: function() { this.doSearch(); },
  components: { "category-product": storeComps.CategoryProductTemplate, navbar: storeComps.NavbarTemplate, "footer-page": storeComps.FooterPageTemplate },
  watch: { '$route': function(to, from) { this.doSearch(); } }
};
storeComps.SearchTemplate = getPlaceholderRoute("searchTemplate", "Search");
