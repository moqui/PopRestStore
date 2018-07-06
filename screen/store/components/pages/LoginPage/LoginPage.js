var LoginPage = {
  name: "login",
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      loginErrormessage: "",
      axiosConfig: {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "moquiSessionToken":storeInfo.moquiSessionToken
        }
      }
    };
  },
  computed: Vuex.mapGetters({
    apiKey: "apiKey"
  }),
  methods: {
    login(event) {
      event.preventDefault();
      if(this.user.username.length < 3 || this.user.password.length < 3){
        this.loginErrormessage = "You must type a valid Username and Password";
        return;
      }
      LoginService.login(this.user, this.axiosConfig).then(function (data) {
        storeInfo.apiKey = data.apiKey;
        location.href ="/store";
      }.bind(this))
      .catch(function (error) {
        this.loginErrormessage = error.response.data.errors;
      }.bind(this));
    }
  },
  mounted() {
    if(storeInfo.apiKey != null) {
      location.href ="/store";
    }
  },
  components: {
    "placeorder-navbar": PlaceOrderNavbarTemplate,
    "footer-page": FooterPageTemplate,
  }
};

var LoginPageTemplate = getPlaceholderRoute("./LoginPage.html", "LoginPage")
