var LoginService = {
  login(user, headers) {
    return axios.post("/rest/s1/pop/login", user, headers).then(function (response) {
      return response.data;
    });
  },
  createAccount(account, headers) {
    return axios.post("/rest/s1/pop/register", account, headers).then(function (response) {
      return response.data;
    });
  },
  logout() {
    return axios.get("/rest/s1/pop/logout").then(function (response) {
      return response.data;
    });
  },
  resetPassword(username, headers) {
    return axios.post("/rest/s1/pop/resetPassword", username, headers).then(function (response) {
      return response.data;
    });
  }
};
