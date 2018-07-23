storeComps.ProductPage = {
  name: "product-page",
  data() {
    return {
      product: {},
      quantity: '1',
      productImgRoute: '',
      isSuccessAddCart:false,
      axiosConfig: {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "api_key":this.$root.apiKey,
          "moquiSessionToken":this.$root.moquiSessionToken
        }
      }
    };
  },
  components: { StarRating: storeComps.StarRatingTemplate, navbar: storeComps.NavbarTemplate,
      "footer-page": storeComps.FooterPageTemplate, "product-review": storeComps.ProductReviewTemplate },
  methods: {
    getProductImageSrc(imageInfo) {
      if (!imageInfo || !imageInfo.productContentId) return null;
      if(this.productImgRoute === ''){
        this.productImgRoute = storeConfig.productImageLocation + imageInfo.productContentId;
      }
      return storeConfig.productImageLocation + imageInfo.productContentId;
    },
    isProductImage(imageInfo) {
      if(!imageInfo || imageInfo.productContentTypeEnumId === 'PcntDescriptionLong') return false;
      return true;
    },
    setProductImge(route) {
      this.productImgRoute = route;
    },
    addProductCart (evt) {
      evt.preventDefault();
      var productCart = {
        "productId":this.product.pseudoId,
        "currencyUomId":this.product.priceUomId,
        "quantity":this.quantity
      };
      ProductService.addProductCart(productCart,this.axiosConfig).then(function (data) {
        this.isSuccessAddCart = true;
      }.bind(this));
    },
  },
  mounted() {
    ProductService.getProduct(this.$route.params.productId).then(function (data) {
      this.product = data;
    }.bind(this));
  }
};
storeComps.ProductPageTemplate = getPlaceholderRoute("productTemplate", "ProductPage");
