var CustomerService = {
  getShippingAddresses(headers) {
    return axios.get("/rest/s1/pop/customer/shippingAddresses",headers).then(function (response) {
      return response.data;
    });
  },
  addShippingAddress(address,headers) {
    return axios.put("/rest/s1/pop/customer/shippingAddresses",address,headers).then(function (response) {
      return response.data;
    });
  },
  getPaymentMethods(headers) {
    return axios.get("/rest/s1/pop/customer/paymentMethods",headers).then(function (response) {
      return response.data;
    });
  },
  addPaymentMethod(paymentMethod,headers) {
    return axios.put("/rest/s1/pop/customer/paymentMethods",paymentMethod,headers).then(function (response) {
      return response.data;
    });
  },
  getCustomerOrders(headers) {
    return axios.get("/rest/s1/pop/customer/orders",headers).then(function (response) {
      return response.data;
    })
  },
  getCustomerOrderById(orderId,headers) {
    return axios.get("/rest/s1/pop/customer/orders/"+orderId,headers).then(function (response) {
      return response.data;
    });
  }
};