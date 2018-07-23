storeComps.OrderNavbar = {
  name: "orderNavbar",
  data() { return {}; },
  props: ["option"]
};
storeComps.PlaceOrderNavbarTemplate = getPlaceholderRoute("checkoutNavbarTemplate", "OrderNavbar", storeComps.OrderNavbar.props);
