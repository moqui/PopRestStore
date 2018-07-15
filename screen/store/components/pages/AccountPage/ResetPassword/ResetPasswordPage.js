var ResetPasswordPage = {
  name: "reset-password",
  data() {
  	return {
  	  data: {
        username: ""
      },
      passwordInfo: {
        username: "",
        oldPassword: "",
        newPassword: "",
        newPasswordVerify: ""
      },
      nextStep: 0,
      responseMessage: "",
      axiosConfig: {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "moquiSessionToken":storeInfo.moquiSessionToken
        }
      }
  	};
  },
  methods: {
    resetPassword(event) {
      event.preventDefault();
      LoginService.resetPassword(this.data,this.axiosConfig).then(function (data) {
          this.nextStep = 1;
          this.responseMessage = "";
      }.bind(this))
      .catch(function (error) {
        this.responseMessage = error.response.data.errors;
      }.bind(this));
  	},
    changePassword(event) {
      event.preventDefault();
      var expreg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,35}$/;
      if(!expreg.test(this.passwordInfo.newPassword)) {
        this.responseMessage = "The password must have at least 8 characters, a special character," +
        " a lowercase letter, a capital letter and at least one number.";
        return;
      }

      if(this.passwordInfo.newPassword != this.passwordInfo.newPasswordVerify) {
        this.responseMessage = "Passwords do not match";
        return;
      }
      this.passwordInfo.username = this.data.username;
      CustomerService.updateCustomerPassword(this.passwordInfo, this.axiosConfig).then(function (data) {
        this.responseMessage = data.messages;
        this.login();
      }.bind(this))
      .catch(function (error) {
        this.responseMessage = error.response.data.errors;
      }.bind(this));
    },
    login(){
      var user = {
        username: this.passwordInfo.username,
        password: this.passwordInfo.newPassword
      }
      LoginService.login(user, this.axiosConfig).then(function (data) {
        storeInfo.apiKey = data.apiKey;
        location.href ="/store";
      }.bind(this));
    }
  },
  components: {
  	"footer-page": FooterPageTemplate,
  }
};
var ResetPasswordTemplate = getPlaceholderRoute(
  "/store/components/pages/AccountPage/ResetPassword/ResetPasswordPage.html",
  "ResetPasswordPage"
);
