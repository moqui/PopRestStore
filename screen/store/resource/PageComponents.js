/* This software is in the public domain under CC0 1.0 Universal plus a Grant of Patent License. */

/* Home Page */

storeConfig.HomeOptions = { data: function() { return { testText: "Test Text" } } };
const HomeComponent = { template: '<route-placeholder :location="$root.storeConfig.homeTemplate" :options="$root.storeConfig.HomeOptions"></route-placeholder>' };

/* Product Category Page */

storeConfig.CategoryProductOptions = {
    props: { productId:{type:String,required:true} }
};
Vue.component('category-product', {
    props: { productId:{type:String,required:true} },
    template: '<route-placeholder :location="$root.storeConfig.categoryProductTemplate" :options="$root.storeConfig.CategoryProductOptions" :properties="$props"></route-placeholder>'
});

storeConfig.CategoryOptions = {
    props: { productCategoryId:String }
};
const CategoryComponent = {
    props: { productCategoryId:String },
    template: '<route-placeholder :location="$root.storeConfig.categoryTemplate" :options="$root.storeConfig.CategoryOptions" :properties="$props"></route-placeholder>'
};

/* Product Detail Page */

storeConfig.ProductOptions = {
    props: { productId:String }
};
const ProductComponent = {
    props: { productId:String },
    template: '<route-placeholder :location="$root.storeConfig.productTemplate" :options="$root.storeConfig.ProductOptions" :properties="$props"></route-placeholder>'
};
