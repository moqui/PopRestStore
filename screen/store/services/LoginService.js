var LoginService = {
  login(username, password) {
    return axios.get("/rest/s1/pop/login?username="+username+"&password="+password).then(function (response) {
      return response.data;
    });
  },
  createAccount(account) {
    return axios.post("/rest/s1/pop/register",account).then(function (response) {
      return response.data;
    });
  },
  logout() {
    return axios.get("/rest/s1/pop/logout").then(function (response) {
      return response.data;
    });
  }
};
