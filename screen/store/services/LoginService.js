var LoginService = {
  login: (username, password) => {
    return axios.post("/rest/s1/pop/login").then(function (response) {
      return response.data;
    });
  }
};
