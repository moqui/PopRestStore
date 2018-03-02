<template>
  <b-navbar class="" fixed="top" toggleable="md" type="dark" variant="dark">
    <div class="d-flex flex-column moqui-navbar">
        <div class="container d-flex flex-row main-navbar">
          <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    
          <b-navbar-brand href="#">
            <img class="moqui-logo" src="../assets/moqui-logo.svg" alt="">
            <span>POP Shop</span>
          </b-navbar-brand>
    
          <b-collapse is-nav id="nav_collapse">
            <b-nav-form>
              <search-input placeholder="Search...">
                  
              </search-input>
            </b-nav-form>
    
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
    
              
            </b-navbar-nav>
    
          </b-collapse>
        </div>
        <div v-if="subBar" class="container d-flex flex-row">
            <b-navbar-nav>
    
              <b-nav-item-dropdown>
                <template slot="button-content">
                  <em>Shop</em>
                </template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item href="#">Signout</b-dropdown-item>
              </b-nav-item-dropdown>

              <b-nav-item-dropdown>
                <template slot="button-content">
                  <em>Deals</em>
                </template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item href="#">Signout</b-dropdown-item>
              </b-nav-item-dropdown>
                <b-nav-item-dropdown>
                    <template slot="button-content">
                    <em>Customer Service</em>
                    </template>
                    <b-dropdown-item href="#">Profile</b-dropdown-item>
                    <b-dropdown-item href="#">Signout</b-dropdown-item>
                </b-nav-item-dropdown>
                </b-navbar-nav> 

    
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
    
              <b-nav-item-dropdown right>
                <!-- Using button-content slot -->
                <template slot="button-content">
                  <em>User</em>
                </template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item href="#">Signout</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
    
        </div>
    </div>
  </b-navbar>

</template>

<script>
import SearchInput from "./forms/SearchInput";
export default {
  name: "navbar",
  props: ["subBar"],
  components: {
    "search-input": SearchInput
  },
  data() {
    return {};
  }
};
</script>


<style lang="scss" rel="stylesheet/scss" scoped>
.moqui-navbar {
  width: 100%;
  .main-navbar {
  }

  .moqui-logo {
    width: 100px;
  }
}
</style>
