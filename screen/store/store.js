var store = new Vuex.Store({
  state: {
    categories: [],
    user: null
  },
  getters: {
    categories: state => state.categories,
    apiKey: state => state.user.apiKey || null
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories;
    },
    login(state, apiKey) {
      state.apiKey = apiKey;
    }
  },
  actions: {
    getAllCategories({ commit }) {
      ProductService.getCategories().then(categories => {
        commit("setCategories", categories);
      });
    },
    login({ commit }, username, password) {
      LoginService.login(username, password).then(apiKey => {
        commit("login", apiKey);
      });
    }
  },
  modules: {}
});
