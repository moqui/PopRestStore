storeComps.CategoryProduct = {
  name: "category-product",
  data: function() { return {
      product1: { smallImageList: [] }
  }; },
  components: { StarRating: storeComps.StarRatingTemplate },
  props: ["product"],
  methods: {
    getProductImageSrc: function(imageInfo) {
      if (!imageInfo || !imageInfo.productContentId) return null;
      return storeConfig.productImageLocation + imageInfo.productContentId;
    },
    getProductSingleImg: function(smallImageList){
      if (!smallImageList[0] || !smallImageList[0].productContentId) return null;
      return storeConfig.productImageLocation + smallImageList[0].productContentId;
    }
  },
  mounted() {
    if (!this._props.product.smallImageList) {
      ProductService.getProduct(this._props.product.productId).then(function (data) {
        this.product1 = data;
        this.product1.smallImageList = data.contentList;
      }.bind(this));
    } else {
      this.product1 = this._props.product;
    }
  }
};
storeComps.CategoryProductTemplate = getPlaceholderRoute("categoryProductTemplate", "CategoryProduct", storeComps.CategoryProduct.props);
