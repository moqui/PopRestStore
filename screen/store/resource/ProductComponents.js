/* This software is in the public domain under CC0 1.0 Universal plus a Grant of Patent License. */

/* Product Category Page */
Vue.component('product-summary', {
    template: '<h4>Product Summary 1</h4>'
});
const CategoryComponent = {
    props: ['productCategoryId'],
    template:
    '<div>' +
        '<h2>This is the category page {{productCategoryId}}</h2>' +
        '<product-summary></product-summary>' +
    '</div>'
};

/* Product Detail Page */
const ProductComponent = {
    props: ['productId'],
    template: '<h2>This is the product detail page {{productId}}</h2>'
};
