var HelpPage = {
  name: "help-page",
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
var HelpPageTemplate = getPlaceholderRoute(
  "/store/components/pages/HelpPage/HelpPage.html",
  "HelpPage"
);