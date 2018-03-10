import axios from "axios";

export default {
  login: (username, password) => {
    return axios.get("/rest/s1/pop/login").then(res => {
      return res.data.apiKey;
    });
  }
};
