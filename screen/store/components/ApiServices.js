var GeoService = {
    getCountries() { return axios.get("/rest/s1/pop/geos").then(function (response) { return response.data; }); },
    getRegions(geoId) { return axios.get("/rest/s1/pop/geos/" + geoId + "/regions").then(function (response) { return response.data; }); },
    getLocale() { return axios.get("/rest/s1/pop/locale").then(function (response) { return response.data; }); },
    getTimeZone() { return axios.get("/rest/s1/pop/timeZone").then(function (response) { return response.data; }); }
};

var LoginService = {
    login(user, headers) { return axios.post("/rest/s1/pop/login", user, headers).then(function (response) { return response.data; }); },
    createAccount(account, headers) { return axios.post("/rest/s1/pop/register", account, headers).then(function (response) { return response.data; }); },
    logout() { return axios.get("/rest/s1/pop/logout").then(function (response) { return response.data; }); },
    resetPassword(username, headers) { return axios.post("/rest/s1/pop/resetPassword", username, headers).then(function (response) { return response.data; }); }
};

var CustomerService = {
  getShippingAddresses(headers) {
    return axios.get("/rest/s1/pop/customer/shippingAddresses",headers).then(function (response) { return response.data; });
  },
  addShippingAddress(address,headers) {
    return axios.put("/rest/s1/pop/customer/shippingAddresses",address,headers).then(function (response) { return response.data; });
  },
  getPaymentMethods(headers) {
    return axios.get("/rest/s1/pop/customer/paymentMethods",headers).then(function (response) { return response.data; });
  },
  addPaymentMethod(paymentMethod,headers) {
    return axios.put("/rest/s1/pop/customer/paymentMethods",paymentMethod,headers).then(function (response) { return response.data; });
  },
  getCustomerOrders(headers) {
    return axios.get("/rest/s1/pop/customer/orders",headers).then(function (response) { return response.data; })
  },
  getCustomerOrderById(orderId,headers) {
    return axios.get("/rest/s1/pop/customer/orders/"+orderId,headers).then(function (response) { return response.data; });
  }, 
  getCustomerInfo(headers) {
    return axios.get("/rest/s1/pop/customer/info").then(function (response) { return response.data; });
  },
  updateCustomerInfo(customerInfo,headers) {
    return axios.put("/rest/s1/pop/customer/updateInfo",customerInfo,headers).then(function (response) { return response.data; });
  },
  updateCustomerPassword(customerInfo,headers) {
    return axios.put("/rest/s1/pop/customer/updatePassword",customerInfo, headers).then(function (response) { return response.data; });
  },
  deletePaymentMethod(paymentMethodId,headers) {
    return axios.delete("/rest/s1/pop/customer/paymentMethods/"+paymentMethodId, headers).then(function (response) { return response.data; });
  },
  deleteShippingAddress(contactMechId,contactMechPurposeId,headers) {
    return axios.delete("/rest/s1/pop/customer/shippingAddresses?contactMechId=" + contactMechId +"&contactMechPurposeId=" + contactMechPurposeId, headers)
        .then(function (response) { return response.data; });
  }
};

var ProductService = {
    getFeaturedProducts() {
        return axios.get("/rest/s1/pop/categories/PopcAllProducts/products").then(function (response) { return response.data.productList; });
    },
    getProductBySearch(searchTerm, productStoreId, categoryId) {
        var params = "term=" + searchTerm;
        if (productStoreId && productStoreId.length) params += "&productStoreId=" + productStoreId;
        if (categoryId && categoryId.length) params += "&productCategoryId=" + categoryId;
        return axios.get("/rest/s1/pop/products/search?" + params).then(function (response) { return response.data; });
    },
    getProductsByCategory(categoryId) {
        return axios.get("/rest/s1/pop/categories/" + categoryId + "/products").then(function (response) { return response.data.productList; });
    },
    getCategoryInfoById(categoryId) {
        return axios.get("/rest/s1/pop/categories/" + categoryId + "/info").then(function (response) { return response.data; });
    },
    getSubCategories(categoryId) {
        return axios.get("/rest/s1/pop/categories/" + categoryId + "/info").then(function (response) { return response.data.subCategoryList; });
    },
    getProduct(productId) {
        return axios.get("/rest/s1/pop/products/" + productId).then(function (response) { return response.data; });
    },
    addProductCart(product,headers) {
        return axios.post("/rest/s1/pop/cart/add",product,headers).then(function (response) { return response.data; });
    },
    getCartInfo(headers) {
        return axios.get("/rest/s1/pop/cart/info",headers).then(function (response) { return response.data; });
    },
    addCartBillingShipping(data, headers) {
        return axios.post("/rest/s1/pop/cart/billingShipping",data,headers).then(function (response) { return response.data; });
    },
    getCartShippingOptions(headers) {
        return axios.get("/rest/s1/pop/cart/shippingOptions", headers).then(function (response) { return response.data; });
    },
    setCartPlace(data, headers) {
        return axios.post("/rest/s1/pop/cart/place",data,headers).then(function (response) { return response.data; });
    },
    updateProductQuantity(data, headers) {
        return axios.post("/rest/s1/pop/cart/updateProductQuantity",data,headers).then(function (response) { return response.data; });
    },
    deleteOrderProduct(orderId, orderItemSeqId,headers) {
        return axios.delete("/rest/s1/pop/cart/deleteOrderItem?orderId="+orderId+"&orderItemSeqId="+orderItemSeqId,headers)
            .then(function (response) { return response.data; });
    }
};
