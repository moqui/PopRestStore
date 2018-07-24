storeComps.CategoryPage = {
  name: "category-page",
  data: function() { return { products: [], category: {} };
  },
  methods: {
    getProductsList: function() {
      ProductService.getProductsByCategory(this.$route.params.categoryId).then(function (data) {
        this.products = data;
      }.bind(this));
    },
    getCategoryInfoById: function() {
      ProductService.getCategoryInfoById(this.$route.params.categoryId).then(function (data) {
        this.category = data;
      }.bind(this));
    }
  },
  watch: { '$route': function(to, from) { this.getProductsList(); this.getCategoryInfoById(); } },
  components: { "category-product": storeComps.CategoryProductTemplate, navbar: storeComps.NavbarTemplate, "footer-page": storeComps.FooterPageTemplate },
  mounted: function() { this.getProductsList(); this.getCategoryInfoById(); }
};
storeComps.CategoryPageTemplate = getPlaceholderRoute("categoryTemplate", "CategoryPage");
