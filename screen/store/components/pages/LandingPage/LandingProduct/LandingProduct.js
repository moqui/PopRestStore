var LandingProduct = {
  name: "landing-product",
  data() {
    return {
      product1: {
        smallImageList: []
      }
    };
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
  mounted() {
    if(this._props.product.smallImageList == undefined){
      ProductService.getProduct(this._props.product.productId).then(function (data) {
        this.product1 = data;
        this.product1.smallImageList = data.contentList;
      }.bind(this));
    } else {
      this.product1 = this._props.product;
    }
  }
};
var LandingProductTemplate = getPlaceholderRoute(
  "/store/components/pages/LandingPage/LandingProduct/LandingProduct.html",
  "LandingProduct",
  LandingProduct.props
);
