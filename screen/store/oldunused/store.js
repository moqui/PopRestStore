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
        // session token for all non-get requests when no user is logged in (no api_key is passed)
        moquiSessionToken: null,
        // userInfo null unless user is logged in, then has response from /customer/info
        customerInfo: storeInfo.customerInfo,
        cartInfo: null
    },
    methods: {
        getAjaxHeaders: function () {
            var headers = { Accept:'application/json' };
            if (this.apiKey && this.apiKey.length) headers.api_key = this.apiKey;
            if (this.moquiSessionToken && this.moquiSessionToken.length) headers.moquiSessionToken = this.moquiSessionToken;
            return headers;
        },
        handleAjaxResponse: function (jqXHR) {
            // for non logged in users get latest session token which may change during the session (bounce to other app server, etc)
            var sessionToken = jqXHR.getResponseHeader("moquiSessionToken");
            if (sessionToken && sessionToken.length) this.moquiSessionToken = sessionToken;
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
                    vm.apiKey = null; vm.customerInfo = null; vm.cartInfo = null;
                    // need more than this to get a new session: vm.$router.push("/");
                    window.location.href = vm.storeConfig.basePath;
                }
            });
        }
    },
    watch: {
    },
    mounted: function () {
        var vm = this;
        if (this.storeConfig.storeName && this.storeConfig.storeName.length) document.title = this.storeConfig.storeName;
        var storeInfo = this.storeInfo;
        if (storeInfo.apiKey && storeInfo.apiKey.length) { this.apiKey = storeInfo.apiKey; storeInfo.apiKey = null; }
        if (storeInfo.moquiSessionToken && storeInfo.moquiSessionToken.length) {
            this.moquiSessionToken = storeInfo.moquiSessionToken; storeInfo.moquiSessionToken = null; }
        if (storeInfo.customerInfo && storeInfo.customerInfo.partyId) {
            this.customerInfo = storeInfo.customerInfo; storeInfo.customerInfo = null; }

        /* don't do this: apiKey, moquiSessionToken, customerInfo now initially loaded with storeInfo if a user logged in (faster, cleaner with no 401 response)
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
        */
    }
});
