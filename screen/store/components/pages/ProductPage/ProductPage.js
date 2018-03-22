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
     ProductService.addProductCart(this.productCart).then(data => {
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
