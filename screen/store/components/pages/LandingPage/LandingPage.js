var LandingPage = {
  name: "landing-page",
  data() {
    return {
      products: []
    };
  },
  beforeCreate() {
    const that = this;
    ProductService.getFeaturedProducts().then(function (response) {
      that.products = response;
    });
  },
  components: {
    landingProduct: LandingProductTemplate,
    carousel: VueCarousel.Carousel,
    slide: VueCarousel.Slide,
    starRating: StarRatingTemplate,
    navbar: NavbarTemplate,
    "footer-page": FooterPageTemplate
  }
};

var LandingPageTemplate = getPlaceholderRoute("/store/components/pages/LandingPage/LandingPage.html", "LandingPage");
