var CreateAccountPage = {
  name: "create-account",
  data() {
  	return {
      accountInfo: [],
      confirmPassword: ""
  	}
  },
  methods: {
    createAccount(){
      LoginService.createAccount(this.accountInfo).then(function (data) {
        console.log(data);
      }.bind(this));
  	}
  },
  components: {
    "footer-page": FooterPageTemplate,
  }
};

var CreateAccountPageTemplate = getPlaceholderRoute(
  "/store/components/pages/AccountPage/CreateAccount/CreateAccountPage.html",
  "CreateAccountPage"
);