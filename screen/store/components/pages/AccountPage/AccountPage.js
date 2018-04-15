var AccountPage = {
  name: "account-page",
  data() {
  	return {};
  },
  methods: {

  },
  components: {
    navbar: NavbarTemplate,
    "footer-page": FooterPageTemplate
  }
};
var AccountPageTemplate = getPlaceholderRoute(
  "/store/components/pages/AccountPage/AccountPage.html",
  "AccountPage"
);
