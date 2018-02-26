/* This software is in the public domain under CC0 1.0 Universal plus a Grant of Patent License. */

const NotFound = Vue.extend({ template: '<div><h4>Screen not found</h4></div>' });

// see https://router.vuejs.org/en/essentials/history-mode.html
const storeRouter = new VueRouter({ base: "/store/", mode: 'history',
    routes: [
        { path: '/', name: 'home', component: HomeComponent },
        { path: '/category/:productCategoryId', name: 'category', component: CategoryComponent, props: true },
        { path: '/product/:productId', name: 'product', component: ProductComponent, props: true },
        { path: '*', component: NotFound }
    ]
});

const storeApp = new Vue({
    router: storeRouter,
    el: '#store-app'
});
