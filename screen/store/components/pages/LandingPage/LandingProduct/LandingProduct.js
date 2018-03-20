var LandingProduct = {
  name: "landing-product",
  data() {
    return {};
  },
  components: {
    StarRating: StarRatingTemplate
  },
  props: ["product"],
  methods: {
    getProductImageSrc(imageInfo) {
      if (!imageInfo || !imageInfo.productContentId) return null;
      return storeConfig.productImageLocation + imageInfo.productContentId;
    }
  },
  mounted() {}
};
var LandingProductTemplate = getPlaceholderRoute(
  "./components/pages/LandingPage/LandingProduct/LandingProduct.html",
  "LandingProduct",
  LandingProduct.props
);
