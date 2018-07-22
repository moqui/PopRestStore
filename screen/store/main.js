/* This software is in the public domain under CC0 1.0 Universal plus a Grant of Patent License. */

var store = new Vuex.Store({
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
});

var router = new VueRouter({
    routes: [
        { path: "/", name: "Products", component: LandingPageTemplate },
        { path: "/login", name: "login", component: LoginPageTemplate },
        { path: "/product/:productId/:extra?", name: "Product", component: ProductPageTemplate },
        { path: "/product/search/:searchText", name: "productsearch", component: ProductSearchTemplate },
        { path: "/checkout", name: "checkout", component: CheckOutPageTemplate },
        { path: "/checkout/:orderId", name: "successcheckout", component: SuccessCheckOutTemplate },
        { path: "/orders/:orderId", name: "order", component: CustomerOrderPageTemplate },
        { path: "/orders", name: "orders", component: CustomerOrdersPageTemplate },
        { path: "/deals/:categoryId/:extra?", name: "deals", component: DealsPageTemplate },
        { path: "/account", name: "account", component: AccountPageTemplate },
        { path: "/account/create", name: "createaccount", component: CreateAccountPageTemplate },
        { path: "/resetPassword", name: "resetPassword", component: ResetPasswordTemplate }
    ]
});

var App = {
    name: "app",
    template: '<div id="app"><router-view></router-view></div>',
    data() { return {}; },
    components: {}
};

var storeComps = {
    SearchInput,
    StarRating,
    Navbar,
    OrderNavbar,
    FooterPage,
    LandingPage,
    LandingProduct,
    LoginPage,
    ProductPage,
    ProductReview,
    ProductImage,
    ProductSearch,
    CheckOutPage,
    CustomerOrderPage,
    CustomerOrdersPage,
    SuccessCheckOut,
    DealsPage,
    AccountPage,
    CreateAccountPage,
    ResetPasswordPage
};

Vue.use(bootstrapVue);
// leave this, reminder to use vue.min.js for production: Vue.config.productionTip = false;

var app = new Vue({
    el: "#app",
    router:router,
    data: function() { return { storeComps:storeComps }; },
    store:store,
    template: "<App/>",
    components: { App:App }
});
