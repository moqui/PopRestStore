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