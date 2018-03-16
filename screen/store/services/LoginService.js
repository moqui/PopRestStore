var LoginService = {
  login: (username, password) => {
    return axios.post("/rest/s1/pop/login").then(res => {
      return res.data;
    });
  }
};
