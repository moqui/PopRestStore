var FooterPage = {
  name: "footer-page",
  data() {
  	return {};
  },
  props: ["infoLink"]
};
var FooterPageTemplate = getPlaceholderRoute(
  "/store/components/pages/FooterPage/FooterPage.html",
  "FooterPage",FooterPage.props
);
