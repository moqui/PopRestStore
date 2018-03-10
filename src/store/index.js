import Vue from "vue";
import Vuex from "vuex";
import ProductsService from "../services/ProductsService";
import LoginService from "../services/LoginService";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: [],
    apiKey: null
  },
  getters: {
    categories: state => state.categories,
    apiKey: state => state.apiKey
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
      ProductsService.getCategories().then(categories => {
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
