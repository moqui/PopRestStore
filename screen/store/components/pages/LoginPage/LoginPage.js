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
  methods: Vuex.mapActions(["login"])
};

var LoginPageTemplate = getPlaceholderRoute("./LoginPage.html", "LoginPage")