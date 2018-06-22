var ResetPasswordPage = {
  name: "reset-password",
  data() {
  	return {
  	  username:""
  	};
  },
  methods: {
    resetPassword() {
      LoginService.resetPassword(username).then(function (data) {
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