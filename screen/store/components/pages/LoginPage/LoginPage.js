var LoginPage = {
  name: "login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed: Vuex.mapGetters({
    apiKey: "apiKey"
  }),
  methods: Vuex.mapActions(["login"]),
  components: {
    "placeorder-navbar": PlaceOrderNavbarTemplate,
    "footer-page": FooterPageTemplate,
  }
};

var LoginPageTemplate = getPlaceholderRoute("./LoginPage.html", "LoginPage")