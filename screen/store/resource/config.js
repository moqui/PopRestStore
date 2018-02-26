/* This software is in the public domain under CC0 1.0 Universal plus a Grant of Patent License. */

var storeConfig = {
    // base path for the router, by default the app page should load from '/store'
    base: "/store/",

    // location for the REST API, default on the same server
    // if the Moqui server is running on a different server use something like "https://api.domain.com/rest/s1/pop"
    restApiLocation: "/rest/s1/pop",

    homeTemplate: "/store/template/home.html",
    categoryTemplate: "/store/template/category.html",
    categoryProductTemplate: "/store/template/category_product.html",
    productTemplate: "/store/template/product.html"
};
