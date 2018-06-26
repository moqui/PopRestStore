var CreateAccountPage = {
  name: "create-account",
  data() {
  	return {
      accountInfo: [],
      confirmPassword: "",
      errorMessage: "",
      axiosConfig: {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "moquiSessionToken":storeInfo.moquiSessionToken
        }
      }
  	}
  },
  methods: {
    createAccount(event){
      event.preventDefault();
      if(this.accountInfo.firstName == null ||  this.accountInfo.firstName.trim() == ""
        || this.accountInfo.lastName == null || this.accountInfo.lastName.trim() == ""
        || this.accountInfo.emailAddress == null || this.accountInfo.emailAddress.trim() == ""
        || this.accountInfo.newPassword == null || this.accountInfo.newPassword.trim() == ""
        || this.confirmPassword == null || this.confirmPassword.trim() == "") {
        this.errorMessage = "Verify the required fields";
        return;
      }

      if(this.accountInfo.newPassword != this.confirmPassword) {
        this.errorMessage = "Passwords do not match";
        return;
      }

      LoginService.createAccount(this.accountInfo, this.axiosConfig).then(function (data) {
        console.log(data);
      }.bind(this));
  	}
  },
  mounted() {
    if(storeInfo.apiKey != null) {
      this.$router.push({ name: 'Products'});
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