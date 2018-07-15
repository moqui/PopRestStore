var GeoService = {
  getCountries() {
  	return axios.get("/rest/s1/pop/geos").then(function (response) {
      return response.data;
  	});
  },
  getRegions(geoId) {
  	return axios.get("/rest/s1/pop/geos/" + geoId + "/regions").then(function (response) {
      return response.data;
  	});
  },
  getLocale() {
    return axios.get("/rest/s1/pop/locale").then(function (response) {
      return response.data;
    });
  },
  getTimeZone() {
    return axios.get("/rest/s1/pop/timeZone").then(function (response) {
      return response.data;
    });
  }
};
