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
  }, 
  getCustomerInfo(headers) {
    return axios.get("/rest/s1/pop/customer/info").then(function (response) {
      return response.data;
    });
  },
  updateCustomerInfo(customerInfo,headers) {
    return axios.put("/rest/s1/pop/customer/updateInfo",customerInfo,headers).then(function (response){
      return response.data;
    });
  },
  updateCustomerPassword(customerInfo,headers) {
    return axios.put("/rest/s1/pop/customer/updatePassword",customerInfo, headers).then(function (response) {
      return response.data;
    });
  },
  deletePaymentMethod(paymentMethodId,headers) {
    return axios.delete("/rest/s1/pop/customer/paymentMethods/"+paymentMethodId, headers).then(function (response) {
      return response.data;
    });
  },
  deleteShippingAddress(contactMechId,contactMechPurposeId,headers) {
    return axios.delete("/rest/s1/pop/customer/shippingAddresses?contactMechId="+contactMechId
    +"&contactMechPurposeId="+contactMechPurposeId,headers).then(function (response) {
      return response.data;
    });
  }
};