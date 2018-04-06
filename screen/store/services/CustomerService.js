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
  },
  getPaymentMethods(headers) {
    return axios.get("/rest/s1/pop/customer/paymentMethods",headers).then(res => {
      return res.data;
    });
  },
  addPaymentMethod(paymentMethod,headers) {
    return axios.put("/rest/s1/pop/customer/paymentMethods",paymentMethod,headers).then(res => {
      return res.data;
    });
  },
  getCustomerOrders(headers) {
    return axios.get("/rest/s1/pop/customer/orders",headers).then(res => {
      return res.data;
    })
  },
  getCustomerOrderById(orderId,headers) {
    return axios.get("/rest/s1/pop/customer/orders/"+orderId,headers).then(res => {
      return res.data;
    });
  }
};