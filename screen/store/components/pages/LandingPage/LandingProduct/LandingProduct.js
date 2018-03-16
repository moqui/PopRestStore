var LandingProduct = {
  name: "landing-product",
  data() {
    return {};
  },
  components: {
    StarRating: StarRatingTemplate
  },
  props: ["product"],
  methods: {},
  mounted() {
    console.log(this.product);
  }
};
var LandingProductTemplate = getPlaceholderRoute(
  "./components/pages/LandingPage/LandingProduct/LandingProduct.html",
  "LandingProduct",
  LandingProduct.props
);
