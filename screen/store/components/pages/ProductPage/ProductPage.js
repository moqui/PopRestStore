var ProductPage = {
  name: "product-page",
  data() {
    return {
      product: {}
    };
  },
  components: {
    StarRating: StarRatingTemplate
  },
  methods: {
    getProductImageSrc(imageInfo) {
      if (!imageInfo || !imageInfo.productContentId) return null;
      return storeConfig.productImageLocation + imageInfo.productContentId;
    }
  },
  mounted() {
    ProductService.getProduct(this.$route.params.productId).then(product => {
      this.product = product;
    });
  }
};
var ProductPageTemplate = getPlaceholderRoute(
  "./components/pages/ProductPage/ProductPage.html",
  "ProductPage"
);
