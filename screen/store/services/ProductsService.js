var ProductService = {
  getFeaturedProducts() {
    return axios.get("/rest/s1/pop/categories/PopcAllProducts/products").then(function (response) {
      return response.data.productList;
    });
  },
  getProductsByCategory(categoryId) {
    return axios.get("/rest/s1/pop/categories/"+categoryId+"/products").then(function (response) {
      return response.data.productList;
    });
  },
  getCategoryInfoById(categoryId) {
    return axios.get("/rest/s1/pop/categories/"+categoryId+"/info").then(function (response) {
      return response.data;
    });
  },
  getCategories() {
    return axios.get("/rest/s1/pop/categories/PopcBrowseRoot/info").then(function (response) {
      return response.data.subCategoryList;
    });
  },
  getProduct(productId) {
    return axios.get("/rest/s1/pop/products/" + productId).then(function (response) {
      return response.data;
    });
  },
  addProductCart(product,headers) {
    return axios.post("/rest/s1/pop/cart/add",product,headers).then(function (response) {
      return response.data;
    });
  },
  getCartInfo(headers) {
    return axios.get("/rest/s1/pop/cart/info",headers).then(function (response) {
      return response.data;
    });
  },
  addCartBillingShipping(data,headers) {
    return axios.post("/rest/s1/pop/cart/billingShipping",data,headers).then(function (response) {
      return response.data;
    });
  },
  getCartShippingOptions(headers) {
    return axios.get("/rest/s1/pop/cart/shippingOptions", headers).then(function (response) {
      return response.data;
    });
  },
  setCartPlace(data,headers) {
    return axios.post("/rest/s1/pop/cart/place",data,headers).then(function (response) {
      return response.data;
    });
  }
};
