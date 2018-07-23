storeComps.FooterPage = {
  name: "footer-page",
  data() { return {}; },
  props: ["infoLink"]
};
storeComps.FooterPageTemplate = getPlaceholderRoute("footerTemplate", "FooterPage", storeComps.FooterPage.props);
