var LoginPage = {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      loginErrormessage: ""
    };
  },
  computed: Vuex.mapGetters({
    apiKey: "apiKey"
  }),
  methods: {
    login() {
      LoginService.login(this.username, this.password).then(function (data) {
        console.log(data);
      }.bind(this))
      .catch(function (error) {
        this.loginErrormessage = error.response.data.errors;
      }.bind(this));;
    }
  },
  components: {
    "placeorder-navbar": PlaceOrderNavbarTemplate,
    "footer-page": FooterPageTemplate,
  }
};

var LoginPageTemplate = getPlaceholderRoute("./LoginPage.html", "LoginPage")