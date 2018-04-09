var ProductPage = {
  name: "product-page",
  data() {
    return {
      product: {},
      quantity: '1',
      productImgRoute: '',
      axiosConfig: {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "api_key":storeInfo.apiKey,
          "moquiSessionToken":storeInfo.moquiSessionToken
        }
      }
    };
  },
  components: {
    StarRating: StarRatingTemplate,
    navbar: NavbarTemplate
  },
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
      ProductService.addProductCart(productCart,this.axiosConfig).then(data => {
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
