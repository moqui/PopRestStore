var ContactPage = {
  name: "contact-page",
  data() {
  	return {};
  },
  components: {
    navbar: NavbarTemplate,
    "footer-page": FooterPageTemplate
  },
  mounted() {
  }
};
var ContactPageTemplate = getPlaceholderRoute(
  "/store/components/pages/ContactPage/ContactPage.html",
  "ContactPage"
);