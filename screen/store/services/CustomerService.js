var CustomerService = {
  getShippingAddresses(headers) {
    return axios.get("/rest/s1/pop/customer/shippingAddresses",headers).then(res => {
      return res.data;
    });
  },
  addShippingAddress(address,headers) {
    return axios.put("/rest/s1/pop/customer/shippingAddresses",address,headers).then(res => {
      return res.data;
    });
  }
};