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
  }
};