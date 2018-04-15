var LandingPage = {
  name: "landing-page",
  data() {
    return {
      products: []
    };
  },
  beforeCreate() {
    ProductService.getFeaturedProducts().then(data => {
      this.products = data;
    });
  },
  methods: {},
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
