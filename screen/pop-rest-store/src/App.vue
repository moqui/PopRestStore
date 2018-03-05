<template>
  <div id="app">
    <navbar sub-bar="true"/>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    Navbar
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 166px;
}

.fa-icon {
  width: auto;
  height: 1em; /* or any other relative font sizes */

  /* You would have to include the following two lines to make this work in Safari */
  max-width: 100%;
  max-height: 100%;
}
</style>
