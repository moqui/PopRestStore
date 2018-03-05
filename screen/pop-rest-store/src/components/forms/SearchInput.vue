<template>

  <div class="search-input">
    <input type="text" :placeholder="placeholder">
    <button class="search-button">
        <icon name="search"/>
            
    </button>
  </div>

</template>

<script>
import Icon from "vue-awesome/components/Icon";

export default {
  name: "search-input",
  data() {
    return {};
  },
  props: ["placeholder"],
  components: { Icon }
};
</script>


<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../scss/main";
.search-input {
  width: 100%;
  position: relative;
  input {
    border: none;
    border-radius: 10px;
    padding: 10px;
    width:100%;
  }

  .search-button {
    background: map-get($theme-colors, primary);
    border: none;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    height: 100%;
    padding: 3px 15px;
    margin-left: -4px;
    color: #fff;
    position: absolute;
    top:0;
    right: 0;
    font-size: 2em;
  }
}
</style>
