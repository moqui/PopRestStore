var ProductPage = {
  name: "product-page",
  data() {
    return {
      product: {},
      productCart: {
        productId:"",
        quantity:1,
        currencyUomId:""
      }
    };
  },
  components: {
    StarRating: StarRatingTemplate
  },
  methods: {
    getProductImageSrc(imageInfo) {
    if (!imageInfo || !imageInfo.productContentId) return null;
    return storeConfig.productImageLocation + imageInfo.productContentId;
    },
    addProductCart (evt) {
      evt.preventDefault();
      this.productCart.productId = this.product.pseudoId;
      this.productCart.currencyUomId = this.product.priceUomId;
      let axiosConfig = {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
          "api_key":storeInfo.apiKey,
          "moquiSessionToken":storeInfo.moquiSessionToken
        }
      };
      ProductService.addProductCart(this.productCart,axiosConfig).then(data => {
        console.log(axiosConfig);
        console.log(data);
      });
    },
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
