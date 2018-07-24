/* This software is in the public domain under CC0 1.0 Universal plus a Grant of Patent License. */
storeComps.StarRating = {
    name: "star-rating",
    props: ["rating"],
    data: function() { return {}; },
    methods: {
        renderStar(index) {
            // TODO: demodernize this for safer browser compatibility, more consistent code
            let { rating } = this._props;
            let isDecimal = !!(rating % 1);
            if (isDecimal) { rating = rating - rating % 1; }
            let value = -1;
            if (rating >= index) { value = 1; }
            if (rating == index && isDecimal) { value = 0; }
            return value;
        }
    }
};
storeComps.StarRatingTemplate = getPlaceholderRoute("starRatingTemplate", "StarRating", storeComps.StarRating.props);

storeComps.CategoryProduct = {
    name: "category-product",
    data: function () { return { product1: {smallImageList: []} }; },
    components: {"star-rating": storeComps.StarRatingTemplate},
    props: ["product"],
    methods: {
        getProductImageSrc: function (imageInfo) {
            if (!imageInfo || !imageInfo.productContentId) return null;
            return storeConfig.productImageLocation + imageInfo.productContentId;
        },
        getProductSingleImg: function (smallImageList) {
            if (!smallImageList[0] || !smallImageList[0].productContentId) return null;
            return storeConfig.productImageLocation + smallImageList[0].productContentId;
        }
    },
    mounted: function () {
        if (!this._props.product.smallImageList) {
            ProductService.getProduct(this._props.product.productId).then(function (data) {
                this.product1 = data;
                this.product1.smallImageList = data.contentList;
            }.bind(this));
        } else {
            this.product1 = this._props.product;
        }
    }
};
storeComps.CategoryProductTemplate = getPlaceholderRoute("categoryProductTemplate", "CategoryProduct", storeComps.CategoryProduct.props);

storeComps.LandingPage = {
    name: "landing-page",
    data() { return { products: [] }; },
    beforeCreate() {
        ProductService.getFeaturedProducts().then(function (response) {
            this.products = response;
        }.bind(this));
    },
    components: { "category-product": storeComps.CategoryProductTemplate, starRating: storeComps.StarRatingTemplate, navbar: storeComps.NavbarTemplate,
        "footer-page": storeComps.FooterPageTemplate, carousel: VueCarousel.Carousel, slide: VueCarousel.Slide }
};
storeComps.LandingPageTemplate = getPlaceholderRoute("homeTemplate", "LandingPage");

storeComps.CategoryPage = {
    name: "category-page",
    data: function() { return { products: [], category: {} }; },
    methods: {
        getProductsList: function() {
            ProductService.getProductsByCategory(this.$route.params.categoryId).then(function (data) {
                this.products = data;
            }.bind(this));
        },
        getCategoryInfoById: function() {
            ProductService.getCategoryInfoById(this.$route.params.categoryId).then(function (data) {
                this.category = data;
            }.bind(this));
        }
    },
    watch: { '$route': function(to, from) { this.getProductsList(); this.getCategoryInfoById(); } },
    components: { "category-product": storeComps.CategoryProductTemplate, navbar: storeComps.NavbarTemplate, "footer-page": storeComps.FooterPageTemplate },
    mounted: function() { this.getProductsList(); this.getCategoryInfoById(); }
};
storeComps.CategoryPageTemplate = getPlaceholderRoute("categoryTemplate", "CategoryPage");

storeComps.Search = {
    name: "product-search",
    data: function() { return { productList: [] }; },
    methods: {
        doSearch: function() {
            // TODO: hard coded category ID
            ProductService.getProductBySearch(this.$route.params.searchText,'PopcAllProducts').then(function (data){
                this.productList = data.productList;
            }.bind(this));
        }
    },
    mounted: function() { this.doSearch(); },
    components: { "category-product": storeComps.CategoryProductTemplate, navbar: storeComps.NavbarTemplate, "footer-page": storeComps.FooterPageTemplate },
    watch: { '$route': function(to, from) { this.doSearch(); } }
};
storeComps.SearchTemplate = getPlaceholderRoute("searchTemplate", "Search");

storeComps.ProductImage = {
    name: "product-image",
    data: function() { return { urlList: {} } },
    methods: {
        getProductImage() {
            if (!this.urlList[0] || !this.urlList[0].productContentId) return null;
            return storeConfig.productImageLocation + this.urlList[0].productContentId;
        }
    },
    props: ["productId"],
    mounted: function() {
        ProductService.getProduct(this._props.productId).then(function (data) { this.urlList = data.contentList; }.bind(this));
    }
};
storeComps.ProductImageTemplate = getPlaceholderRoute("productImageTemplate", "ProductImage", storeComps.ProductImage.props);

storeComps.ProductReview = {
    name: "product-review",
    data() { return {} },
    components: { StarRating: storeComps.StarRatingTemplate },
    props: ["reviews"]
};
storeComps.ProductReviewTemplate = getPlaceholderRoute("productReviewTemplate", "ProductReview", storeComps.ProductReview.props);

storeComps.ProductPage = {
    name: "product-page",
    data: function() { return {
        product: {}, quantity: '1', productImgRoute: '', isSuccessAddCart:false,
        axiosConfig: { headers: { "Content-Type": "application/json;charset=UTF-8", "Access-Control-Allow-Origin": "*",
                "api_key":this.$root.apiKey, "moquiSessionToken":this.$root.moquiSessionToken } }
    }; },
    components: { StarRating: storeComps.StarRatingTemplate, navbar: storeComps.NavbarTemplate,
        "footer-page": storeComps.FooterPageTemplate, "product-review": storeComps.ProductReviewTemplate },
    methods: {
        getProductImageSrc: function(imageInfo) {
            if (!imageInfo || !imageInfo.productContentId) return null;
            if (this.productImgRoute === '') {
                this.productImgRoute = storeConfig.productImageLocation + imageInfo.productContentId;
            }
            return storeConfig.productImageLocation + imageInfo.productContentId;
        },
        isProductImage: function(imageInfo) {
            if (!imageInfo || imageInfo.productContentTypeEnumId === 'PcntDescriptionLong') return false;
            return true;
        },
        setProductImge: function(route) { this.productImgRoute = route; },
        addProductCart: function(evt) {
            var productCart = { "productId":this.product.pseudoId, "currencyUomId":this.product.priceUomId, "quantity":this.quantity };
            ProductService.addProductCart(productCart, this.axiosConfig).then(function (data) {
                this.isSuccessAddCart = true;
            }.bind(this));
        }
    },
    mounted: function() {
        ProductService.getProduct(this.$route.params.productId).then(function (data) {
            this.product = data;
        }.bind(this));
    }
};
storeComps.ProductPageTemplate = getPlaceholderRoute("productTemplate", "ProductPage");
