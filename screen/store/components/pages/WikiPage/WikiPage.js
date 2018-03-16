var WikiPage = {
  name: "content",
  template: "<div v-html='contentHtml'></div>",
  data() {
    return {
      contentHtml: ""
    };
  },
  mounted() {
    ContentService.getContent(this.$route.params.contentId).then(res => {
      this.contentHtml = res;
    });
  }
};
