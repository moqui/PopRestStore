storeComps.SearchInput = {
  name: "search-input",
  data() {
    return {
    	searchText: ""
    };
  },
  methods: {
    searchProduct(event){
      event.preventDefault();
      this.$router.push({ name: 'productsearch', params: { searchText: this.searchText }});
    }
  },
  props: ["placeholder"]
};
storeComps.SearchInputTemplate = getPlaceholderRoute("searchInputTemplate", "SearchInput");
