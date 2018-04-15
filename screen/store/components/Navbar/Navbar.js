var Navbar = {
  name: "navbar",
  props: ["subBar"],
  components: {
    "search-input": SearchInputTemplate
  },
  computed: Vuex.mapGetters({
    categories: "categories"
  }),
  created() {
    this.$store.dispatch("getAllCategories");
  }
};

var NavbarTemplate = getPlaceholderRoute("/store/components/Navbar/Navbar.html", "Navbar", Navbar.props);
