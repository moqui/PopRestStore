storeComps.LoginPage = {
  name: "login",
  data: function() { return {
      user: { username: "", password: "" },
      loginErrormessage: "",
      axiosConfig: { headers: { "Content-Type": "application/json;charset=UTF-8", "Access-Control-Allow-Origin": "*", "moquiSessionToken":this.$root.moquiSessionToken } }
  }; },
  computed: { apiKey: function() { return this.$root.apiKey } },
  methods: {
    login: function(event) {
      if(this.user.username.length < 3 || this.user.password.length < 3){
        this.loginErrormessage = "You must type a valid Username and Password";
        return;
      }
      LoginService.login(this.user, this.axiosConfig).then(function (data) {
        this.$root.apiKey = data.apiKey;
        location.href ="/store";
      }.bind(this)).catch(function (error) { this.loginErrormessage = error.response.data.errors; }.bind(this)); }
  },
  mounted: function() { if(this.$root.apiKey != null) { location.href ="/store"; } },
  components: { "placeorder-navbar": storeComps.PlaceOrderNavbarTemplate, "footer-page": storeComps.FooterPageTemplate }
};
storeComps.LoginPageTemplate = getPlaceholderRoute("loginTemplate", "LoginPage");
