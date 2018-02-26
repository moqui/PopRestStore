/* This software is in the public domain under CC0 1.0 Universal plus a Grant of Patent License. */

// const HomeComponent = { template: '#HomeTemplate' };
storeConfig.HomeOptions = { data: function() { return { testText: "Test Text" } } };
const HomeComponent = { template: '<route-placeholder :location="$root.storeConfig.homeTemplate" :options="$root.storeConfig.HomeOptions"></route-placeholder>' };
