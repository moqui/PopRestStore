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
                <search-input placeholder="Search..." />
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <div class="text-secondary">
                        Official POP Merchandise
                    </div>
                
                </b-navbar-nav>
        
            </b-collapse>
        </div>
        <div v-if="subBar" class="container d-flex flex-row">
            <b-navbar-nav>
    
                <b-nav-item-dropdown>
                    <template slot="button-content">
                        <em>Shop</em>
                    </template>
                    <b-dropdown-item href="#" v-for="category in categories" :key="category.productCategoryId">
                        {{category.categoryName}}
                    </b-dropdown-item>
                </b-nav-item-dropdown>

              
                <a class="nav-link">Deals</a>
               
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
import { mapGetters, mapActions } from "vuex";
export default {
  name: "navbar",
  props: ["subBar"],
  components: {
    "search-input": SearchInput
  },
  computed: mapGetters({
    categories: "categories"
  }),
  created () {
    this.$store.dispatch("getAllCategories");
  }
};
</script>


<style lang="scss" rel="stylesheet/scss" scoped>
.moqui-navbar {
  width: 100%;

  .moqui-logo {
    width: 101px;
  }
}
</style>
