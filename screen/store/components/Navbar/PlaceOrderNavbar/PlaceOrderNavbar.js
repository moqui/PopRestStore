var OrderNavbar = {
  name: "orderNavbar",
  data() {
    return {};
  },
  props: ["option"]
};

var PlaceOrderNavbarTemplate = getPlaceholderRoute("/store/components/Navbar/PlaceOrderNavbar/PlaceOrderNavbar.html", "OrderNavbar", OrderNavbar.props);
