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
  }
};
