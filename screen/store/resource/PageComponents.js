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
    data: function () { return { categoryInfo:null, subCategoryList:[], productList:[], pageIndex:0, pageSize:20 } },
    methods: {
        goPage: function (pageNum) { this.pageIndex = pageNum; },
        fetchInfo: function() {
            var url = this.$root.storeConfig.restApiLocation + "s1/pop/categories/" + this.productCategoryId + "/info";
            var searchObj = { };
            console.info("Loading category info from " + url + " params " + JSON.stringify(searchObj));
            var vm = this;
            $.ajax({ type:"GET", url:url, data:searchObj, dataType:"json", headers:this.$root.getAjaxHeaders(), error:moqui.handleAjaxError,
                success: function(infoObj, status, jqXHR) { if (infoObj) {
                    // console.log(infoObj);
                    vm.categoryInfo = infoObj;
                    vm.subCategoryList = infoObj.subCategoryList;
                } }
            });
        },
        fetchProducts: function () {
            var url = this.$root.storeConfig.restApiLocation + "s1/pop/categories/" + this.productCategoryId + "/products";
            var searchObj = { pageIndex:this.pageIndex, pageSize:this.pageSize };
            console.info("Loading category products from " + url + " params " + JSON.stringify(searchObj));
            var vm = this;
            $.ajax({ type:"GET", url:url, data:searchObj, dataType:"json", headers:this.$root.getAjaxHeaders(), error:moqui.handleAjaxError,
                success: function(infoObj, status, jqXHR) { if (infoObj) { vm.productList = infoObj.productList; } } });
        }
    },
    watch: {
        // needed because same component instance is used when going from one category to another, faster this way too
        productCategoryId: function () { this.fetchInfo(); this.fetchProducts(); },
        pageIndex: function () { this.fetchProducts(); },
        pageSize: function () { this.fetchProducts(); }
    },
    mounted: function () { this.fetchInfo(); this.fetchProducts(); }
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

/* Content Display */

storeComps.ContentComponent = {
    data: function () { return { contentHtml:null }; },
    template: '<div v-html="contentHtml"></div>',
    methods: {
        fetchContent: function () {
            var contentPath = this.$route.params[0];
            var url = this.$root.storeConfig.contentLocation + contentPath;

            var vm = this;
            $.ajax({ type:"GET", url:url, dataType:"html", headers:this.$root.getAjaxHeaders(), error:moqui.handleAjaxError,
                success: function(responseHtml, status, jqXHR) { vm.contentHtml = responseHtml; }
            });
        }
    },
    watch: { '$route': function (to, from) { this.fetchContent(); } },
    mounted: function () { this.fetchContent(); }
};

/* ========== Profile and Order History ========== */

storeComps.LoginOptions = {
    data: function () { return {
        activeTab:"login",
        // TODO: remove these, should only have in initial dev for easier testing
        username:"john.doe", password:"moqui", newPassword:"", newPasswordVerify:"",
        firstName:"", lastName:"", emailAddress:""
    }; },
    methods: {
        setTab: function (tabName) { this.activeTab = tabName || 'login'; },
        submitLogin: function () {
            var url = this.$root.storeConfig.restApiLocation + "s1/pop/login";
            var dataObj = { username:this.username, password:this.password };
            console.info("Login " + url + " username " + dataObj.username);
            var vm = this;
            $.ajax({ type:"POST", url:url, data:dataObj, dataType:"json", headers:this.$root.getAjaxHeaders(), error:moqui.handleAjaxError,
                success: function(respObj, status, jqXHR) { if (respObj) {
                    // console.log(respObj);
                    vm.$root.apiKey = respObj.apiKey;
                    vm.$root.customerInfo = respObj.customerInfo;
                    if (vm.$root.preLoginRoute) {
                        console.log("pushing " + vm.$root.preLoginRoute.fullPath);
                        vm.$root.$router.push(vm.$root.preLoginRoute.fullPath);
                        vm.$root.preLoginRoute = null;
                    } else {
                        vm.$root.$router.push("/");
                    }
                } }
            });
        },
        submitReset: function () {

        },
        submitChange: function () {

        },
        submitRegister: function () {

        }
    }
};
storeComps.LoginComponent = {
    template: '<route-placeholder :location="$root.storeConfig.loginTemplate" :options="$root.storeComps.LoginOptions"></route-placeholder>'
};

storeComps.ProfileOptions = {
    data: function () { return { methodInfoList:null, postalAddressList:null }; },
    methods: {
        fetchInfo: function() {
            // TODO get methodInfoList, postalAddressList
            // TODO: expecting updates on this screen so make sure session token is fresh by calling handleAjaxResponse(jqXHR) in AJAX success
        }
    },
    mounted: function () {
        if (this.$root.customerInfo) {
            this.fetchInfo();
        } else {
            this.$root.preLoginRoute = this.$root.$router.currentRoute;
            this.$root.$router.push('/login');
        }
    }
};
storeComps.ProfileComponent = {
    template: '<route-placeholder :location="$root.storeConfig.profileTemplate" :options="$root.storeComps.ProfileOptions"></route-placeholder>'
};
