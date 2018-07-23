/* This software is in the public domain under CC0 1.0 Universal plus a Grant of Patent License. */

var appObjects = {
    store: new Vuex.Store({
        state: { categories: [], user: null },
        getters: {
            categories: function(state) { return state.categories; },
            apiKey: function(state) { return state.user.apiKey || null; }
        },
        mutations: {
            setCategories: function(state, categories) { state.categories = categories; },
            login: function(state, apiKey) { state.apiKey = apiKey; }
        },
        actions: {
            getAllCategories: function({ commit }) {
                ProductService.getCategories().then(function(categories) { commit("setCategories", categories); });
            },
            login: function({ commit }, username, password) {
                LoginService.login(username, password).then(function(apiKey) { commit("login", apiKey); });
            }
        },
        modules: {}
    }),
    router: new VueRouter({
        routes: [
            { path: "/", name: "Products", component: storeComps.LandingPageTemplate },
            { path: "/login", name: "login", component: storeComps.LoginPageTemplate },
            { path: "/product/:productId/:extra?", name: "Product", component: storeComps.ProductPageTemplate },
            { path: "/product/search/:searchText", name: "productsearch", component: storeComps.ProductSearchTemplate },
            { path: "/checkout", name: "checkout", component: storeComps.CheckOutPageTemplate },
            { path: "/checkout/:orderId", name: "successcheckout", component: storeComps.SuccessCheckOutTemplate },
            { path: "/orders/:orderId", name: "order", component: storeComps.CustomerOrderPageTemplate },
            { path: "/orders", name: "orders", component: storeComps.CustomerOrdersPageTemplate },
            { path: "/deals/:categoryId/:extra?", name: "deals", component: storeComps.DealsPageTemplate },
            { path: "/account", name: "account", component: storeComps.AccountPageTemplate },
            { path: "/account/create", name: "createaccount", component: storeComps.CreateAccountPageTemplate },
            { path: "/resetPassword", name: "resetPassword", component: storeComps.ResetPasswordTemplate }
        ]
    }),
    App: {
        name: "app",
        template: '<div id="app"><router-view></router-view></div>',
        data() { return {}; }, components: {}
    }
};

Vue.use(bootstrapVue);
// leave this, reminder to use vue.min.js for production: Vue.config.productionTip = false;

var app = new Vue({
    el: "#app",
    router:appObjects.router,
    data: function() { return { storeConfig:storeConfig, storeComps:storeComps }; },
    store:appObjects.store,
    template: "<App/>",
    components: { App:appObjects.App }
});
