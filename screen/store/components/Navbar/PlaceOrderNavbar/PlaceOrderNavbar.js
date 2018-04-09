var OrderNavbar = {
  name: "orderNavbar",
  data() {
    return {};
  },
  props: ["option"]
};

var PlaceOrderNavbarTemplate = getPlaceholderRoute("./PlaceOrderNavbar.html", "OrderNavbar",OrderNavbar.props);