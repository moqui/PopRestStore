var ContentService = {
  getContent: contentId => {
    return axios.get("/content/" + contentId).then(function (response) {
      return response.data;
    });
  }
};
