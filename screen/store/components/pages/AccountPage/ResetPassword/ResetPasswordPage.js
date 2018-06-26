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
    resetPassword() {
      LoginService.resetPassword(this.data,this.axiosConfig).then(function (data) {
        if(data.errorCode == 400){
          this.responseMessage = data.errors;
        }else {
          this.responseMessage = data.messages;
        }
      }.bind(this));
  	},
    changePassword() {
      CustomerService.updateCustomerPassword(this.passwordInfo, this.axiosConfig).then(function (data) {
        console.log(data);
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