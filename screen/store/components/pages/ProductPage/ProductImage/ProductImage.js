var ProductImage = {
  name: "product-image",
  data() {
    return {
    	urlList: {}
    }
  },
  methods: {
    getProductImage() {
      if (!this.urlList[0] || !this.urlList[0].productContentId) return null;
      return storeConfig.productImageLocation + this.urlList[0].productContentId;
    }
  },
  components: {
  },
  props: ["productId"],
  mounted() {
  	ProductService.getProduct(this._props.productId).then(function (data) {
        this.urlList = data.contentList;
    }.bind(this));
  }
};
var ProductImageTemplate = getPlaceholderRoute(
  "/store/components/pages/ProductPage/ProductImage/ProductImage.html","ProductImage",ProductImage.props
);