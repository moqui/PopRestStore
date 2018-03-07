import axios from "axios";

export default {
  getContent: contentId => {
    return axios.get("/content/" + contentId).then(res => {
      return res.data;
    });
  }
};
