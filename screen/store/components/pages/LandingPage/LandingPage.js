var LandingPage = {
  name: "landing-page",
  data() {
    return {
      products: []
    };
  },
  beforeCreate() {
    ProductService.getFeaturedProducts().then(function (response) {
      this.products = response;
    }.bind(this));
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
