/* This software is in the public domain under CC0 1.0 Universal plus a Grant of Patent License. */

// see https://router.vuejs.org/en/essentials/history-mode.html
// for route path expressions see https://router.vuejs.org/en/essentials/dynamic-matching.html AND https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js
const storeRouter = new VueRouter({
    base: storeConfig.basePath, mode: 'history',
    routes: [
        { path: '/', name: 'home', component: storeComps.HomeComponent },
        { path: '/category/:productCategoryId/:extra?', name: 'category', component: storeComps.CategoryComponent, props: true },
        { path: '/product/:productId/:extra?', name: 'product', component: storeComps.ProductComponent, props: true },
        { path: '/content/*', name: 'content', component: storeComps.ContentComponent },
        { path: '/profile', name: 'profile', component: storeComps.ProfileComponent },
        { path: '/login', name: 'login', component: storeComps.LoginComponent },
        { path: '*', component: moqui.NotFoundComponent }
    ]
});

var storeApp = new Vue({
    el: '#store-app', router: storeRouter,
    data: {
        storeComps: storeComps,
        storeConfig: storeConfig,
        storeInfo: storeInfo, categoryList: storeInfo.categoryList, categoryByType: storeInfo.categoryByType,
        preLoginRoute: null,
        // apiKey null unless user is logged in
        apiKey: null,
        // userInfo null unless user is logged in, then has response from /customer/info
        customerInfo: null,
        cartOrderId: null, cartInfo:{}
    },
    methods: {
        getAjaxHeaders: function () {
            var headers = { Accept:'application/json' };
            if (this.apiKey && this.apiKey.length) headers.api_key = this.apiKey;
            return headers;
        },
        getProductImageSrc: function (imageInfo) {
            if (!imageInfo || !imageInfo.productContentId) return null;
            return storeConfig.productImageLocation + imageInfo.productContentId;
        },
        logoutUser: function () {
            var vm = this;
            $.ajax({ type:"GET", url:(this.storeConfig.restApiLocation + "logout"), dataType:"text",
                error: function (jqXHR, textStatus, errorThrown) { console.log("Logout " + textStatus + " " + jqXHR.responseText); },
                success: function(respText, status, jqXHR) {
                    vm.apiKey = null; vm.customerInfo = null;
                    vm.cartOrderId = null; vm.cartInfo = null;
                    vm.$router.push("/");
                }
            });
        }
    },
    watch: {
        cartOrderId: function () { /* TODO: get cartInfo from cartOrderId */ }
    },
    mounted: function () {
        var vm = this;
        if (this.storeConfig.storeName && this.storeConfig.storeName.length) document.title = this.storeConfig.storeName;
        // see if user already logged in, get apiKey and customerInfo for user
        if (!this.apiKey || !this.apiKey.length) {
            $.ajax({ type:"GET", url:(this.storeConfig.restApiLocation + "api_key"), dataType:"text",
                error: function (jqXHR, textStatus, errorThrown) { console.log("Customer not logged in on initial load"); },
                success: function(respText, status, jqXHR) { if (respText && respText.length) {
                    vm.apiKey = respText;
                    var infoUrl = vm.storeConfig.restApiLocation + "s1/pop/customer/info";
                    console.info("Loading profile info from " + infoUrl);
                    $.ajax({ type:"GET", url:infoUrl , dataType:"json", headers:vm.getAjaxHeaders(), error:moqui.handleAjaxError,
                        success: function(infoObj, status, jqXHR) { if (infoObj) {
                            console.log(infoObj);
                            vm.customerInfo = infoObj;
                        } }
                    });
                } }
            });
        }
    }
});
