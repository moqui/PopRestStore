Vue.component("route-placeholder", {
  props: {
    location: {
      type: String,
      required: true
    },
    options: Object,
    properties: Object
  },
  data() {
    return { activeComponent: null };
  },
  template: '<component :is="activeComponent" v-bind="properties"></component>',
  mounted: function() {
    var jsCompObj = this.options || {};
    // NOTE on cache: on initial load if there are multiple of the same component (like category-product) will load template multiple times, consider some sort of lock/wait
    var cachedComponent = moqui.componentCache.get(this.location);
    if (cachedComponent) {
      this.activeComponent = cachedComponent;
    } else {
      axios.get(this.location).then(res => {
        jsCompObj.template = res.data;
        var vueComp = Vue.extend(jsCompObj);
        this.activeComponent = vueComp;
        moqui.componentCache.put(this.location, vueComp);
      }, moqui.handleLoadError);
    }
  }
});
function getPlaceholderRoute(location, name, props) {
  var component = {
    name,
    template: `
        <route-placeholder location="${location}" :options="$root.storeComps['${name}']" :properties="$props"></route-placeholder>
    `
  };

  if (props) {
    component.props = props;
  }
  return component;
}
