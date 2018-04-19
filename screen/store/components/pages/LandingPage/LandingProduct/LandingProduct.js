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
    },
    getProductSingleImg(smallImageList){
      if (!smallImageList[0] || !smallImageList[0].productContentId) return null;
      return storeConfig.productImageLocation + smallImageList[0].productContentId;
    }
  },
  mounted() {}
};
var LandingProductTemplate = getPlaceholderRoute(
  "/store/components/pages/LandingPage/LandingProduct/LandingProduct.html",
  "LandingProduct",
  LandingProduct.props
);
