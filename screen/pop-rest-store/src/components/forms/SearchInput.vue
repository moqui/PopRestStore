<template>

  <div class="search-input">
    <input type="text" v-bind:placeholder="placeholder">
    <button class="search-button">
        {{icons.magnifyingGlass}}
    </button>
  </div>

</template>

<script>
import icons from "glyphicons";
console.log(icons)
export default {
  name: "search-input",
  data() {
    return {
        icons
    };
  },
  props: ["placeholder"]
};
</script>


<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../scss/main";
.search-input {
  input {
    border: none;
    border-radius: 5px;
    padding: 3px;
  }

  .search-button {
    background: map-get($theme-colors, primary);
  }
}
</style>
