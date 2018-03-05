/* This software is in the public domain under CC0 1.0 Universal plus a Grant of Patent License. */

// see https://router.vuejs.org/en/essentials/history-mode.html
// for route path expressions see https://router.vuejs.org/en/essentials/dynamic-matching.html AND https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js
const storeRouter = new VueRouter({
    base: storeConfig.basePath, mode: 'history',
    routes: [
        { path: '/', name: 'home', component: storeComps.HomeComponent },
        { path: '/category/:productCategoryId/:extra?', name: 'category', component: storeComps.CategoryComponent, props: true },
        { path: '/product/:productId/:extra?', name: 'product', component: storeComps.ProductComponent, props: true },
        { path: '*', component: moqui.NotFoundComponent }
    ]
});

const storeApp = new Vue({
    el: '#store-app', router: storeRouter,
    data: {
        storeComps: storeComps,
        storeConfig: storeConfig,
        storeInfo: storeInfo, categoryList: storeInfo.categoryList, categoryByType: storeInfo.categoryByType,
        // apiKey null unless user is logged in
        apiKey: null,
        // userInfo null unless user is logged in, then has response from /customer/info
        customerInfo: null
    },
    methods: {
        getAjaxHeaders: function () {
            var headers = { Accept:'application/json' };
            if (this.apiKey) headers.api_key = this.apiKey;
            return headers;
        },
        getProductImageSrc: function (imageInfo) {
            if (!imageInfo || !imageInfo.productContentId) return null;
            return storeConfig.productImageLocation + imageInfo.productContentId;
        }
    },
    mounted: function () {
        if (this.storeConfig.storeName && this.storeConfig.storeName.length) document.title = this.storeConfig.storeName;
    }
});
