var AboutPage = {
  name: "about-page",
  data() {
  	return {};
  },
  methods: {
  },
  components: {
    navbar: NavbarTemplate,
    "footer-page": FooterPageTemplate
  },
  mounted() {
  }
};
var AboutPageTemplate = getPlaceholderRoute(
  "/store/components/pages/AboutPage/AboutPage.html",
  "AboutPage"
);