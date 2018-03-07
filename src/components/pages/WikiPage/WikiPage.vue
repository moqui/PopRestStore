<template>
  <div v-html="contentHtml"></div>
</template>


<script>
import ContentService from "../../../services/ContentService.js";
export default {
  name: "content",
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
</script>
