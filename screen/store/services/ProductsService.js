var ProductService = {
  getFeaturedProducts() {
    return axios.get("/rest/s1/pop/categories/PopcAllProducts/products").then(res => {
      return res.data.productList;
    });
  },
  getCategories() {
    return axios.get("/rest/s1/pop/categories/PopcBrowseRoot/info").then(res => {
      return res.data.subCategoryList;
    });
  },
  getProduct(productId) {
    return axios.get("/rest/s1/pop/products/" + productId).then(res => {
      return res.data;
    });
  },
  addProductCart(product,headers) {
    return axios.post("/rest/s1/pop/cart/add",product,headers).then(res => {
      return res.data;
    });
  },
  getProductsInCart(headers){
    return axios.get("/rest/s1/pop/cart/info",headers).then(res => {
      return res.data;
    });
  },
  addAddressToCart(addressId,headers){
    return axios.post("/rest/s1/pop/cart/billingShipping",addressId,headers).then(res => {
      return res.data;
    });
  }
};
