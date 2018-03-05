/* This software is in the public domain under CC0 1.0 Universal plus a Grant of Patent License. */

/* Home Page */

storeComps.HomeOptions = { data: function() { return { testText: "Test Text" } } };
storeComps.HomeComponent = { template: '<route-placeholder :location="$root.storeConfig.homeTemplate" :options="$root.storeComps.HomeOptions"></route-placeholder>' };

/* Product Category Page */

storeComps.CategoryProductProperties = { productId:{type:String,required:true}, productInfo:Object };
storeComps.CategoryProductOptions = {
    props: storeComps.CategoryProductProperties
};
Vue.component('category-product', {
    props: storeComps.CategoryProductProperties,
    template: '<route-placeholder :location="$root.storeConfig.categoryProductTemplate" :options="$root.storeComps.CategoryProductOptions" :properties="$props"></route-placeholder>'
});

storeComps.CategoryProperties = { productCategoryId:{type:String,required:true} };
storeComps.CategoryOptions = {
    props: storeComps.CategoryProperties,
    data: function() { return { categoryInfo:null, productList:[] } },
    methods: {
        fetchProducts: function() {
            var url = this.$root.storeConfig.restApiLocation + "categories/" + this.productCategoryId + "/products";
            console.info("Loading category info from " + url);
            var vm = this;
            $.ajax({ type:"GET", url:url, dataType:"json", headers:this.$root.getAjaxHeaders(), error:moqui.handleAjaxError,
                success: function(infoObj, status, jqXHR) {
                    // console.info(infoObj);
                    if (infoObj) {
                        vm.categoryInfo = infoObj;
                        if (infoObj.productList) vm.productList = infoObj.productList;
                    }
                }
            });
        }
    },
    // needed because same component instance is used when going from one category to another, faster this way too
    watch: { productCategoryId: function() { this.fetchProducts(); } },
    mounted: function() { this.fetchProducts(); }
};
storeComps.CategoryComponent = {
    props: storeComps.CategoryProperties,
    template: '<route-placeholder :location="$root.storeConfig.categoryTemplate" :options="$root.storeComps.CategoryOptions" :properties="$props"></route-placeholder>'
};

/* Product Detail Page */

storeComps.ProductProperties = { productId:{type:String,required:true} };
storeComps.ProductOptions = {
    props: storeComps.ProductProperties
};
storeComps.ProductComponent = {
    props: storeComps.ProductProperties,
    template: '<route-placeholder :location="$root.storeConfig.productTemplate" :options="$root.storeComps.ProductOptions" :properties="$props"></route-placeholder>'
};
