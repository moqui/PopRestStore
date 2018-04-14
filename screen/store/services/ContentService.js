var ContentService = {
  getContent: contentId => {
    return axios.get("/content/" + contentId).then(res => {
      return res.data;
    });
  }
};
