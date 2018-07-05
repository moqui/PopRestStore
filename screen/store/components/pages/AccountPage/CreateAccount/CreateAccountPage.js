var CreateAccountPage = {
  name: "create-account",
  data() {
  	return {
      accountInfo: {},
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
      var emailValidation = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      var expreg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,35}$/;

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
      
      this.accountInfo.newPasswordVerify = this.confirmPassword;
      console.log(this.accountInfo);

      LoginService.createAccount(this.accountInfo, this.axiosConfig).then(function (data) {
        this.login(this.accountInfo.emailAddress, this.accountInfo.newPassword);
      }.bind(this))
      .catch(function (error) {
        this.errorMessage = "An error occurred: " + error.response.data.errors;
        console.log(error);
      }.bind(this));
  	},
    login(userName, password) {
      var user = {
        username: userName,
        password: password
      };
      LoginService.login(user, this.axiosConfig).then(function (data) {
        storeInfo.apiKey = data.apiKey;
        location.href ="/store";
      }.bind(this))
      .catch(function (error) {
        this.errorMessage = error.response.data.errors;
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
