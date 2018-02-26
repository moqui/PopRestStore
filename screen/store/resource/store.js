/* This software is in the public domain under CC0 1.0 Universal plus a Grant of Patent License. */


// see https://router.vuejs.org/en/essentials/history-mode.html
// for route path expressions see https://router.vuejs.org/en/essentials/dynamic-matching.html AND https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js
const storeRouter = new VueRouter({ base: storeConfig.base, mode: 'history',
    routes: [
        { path: '/', name: 'home', component: HomeComponent },
        { path: '/category/:productCategoryId/:extra?', name: 'category', component: CategoryComponent, props: true },
        { path: '/product/:productId/:extra?', name: 'product', component: ProductComponent, props: true },
        { path: '*', component: moqui.NotFoundComponent }
    ]
});

const storeApp = new Vue({
    el: '#store-app', router: storeRouter,
    data: {
        storeConfig: storeConfig,
        // apiKey null unless user is logged in
        apiKey: null,
        // userInfo null unless user is logged in, then has response from /customer/info
        customerInfo: null
    }
});
