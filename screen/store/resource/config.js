/* This software is in the public domain under CC0 1.0 Universal plus a Grant of Patent License. */

var storeConfig = {
    // ID of the ProductStore record used for configuration retrieved from the server, placing orders, etc
    productStoreId: "POPC_DEFAULT",

    // base path for the router, by default the app page should load from '/store'
    basePath: "/store/",

    // REST API base location, default on the same server
    // if the Moqui server is running on a different server use something like "https://api.domain.com/rest/s1/pop"
    restApiLocation: "/rest/s1/pop/",

    // Content base location for server administered content, points to the content.xml screen
    // this may be a path on the same server or for production preferably a full URL that goes through a caching proxy like CloudFlare
    contentLocation: "/content/",
    contentAttachmentLocation: "/content/attachment/",
    productImageLocation: "/content/productImage/",

    // page/etc template locations (may be path or full URL)
    homeTemplate: "/store/template/home.html",
    categoryTemplate: "/store/template/category.html",
    categoryProductTemplate: "/store/template/category_product.html",
    productTemplate: "/store/template/product.html"
};

var storeComps = {};
