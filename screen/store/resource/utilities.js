/* This software is in the public domain under CC0 1.0 Universal plus a Grant of Patent License. */

var moqui = {
    isString: function(obj) { return typeof obj === 'string'; },
    isBoolean: function(obj) { return typeof obj === 'boolean'; },
    isNumber: function(obj) { return typeof obj === 'number'; },
    isArray: function(obj) { return Object.prototype.toString.call(obj) === '[object Array]'; },
    isFunction: function(obj) { return Object.prototype.toString.call(obj) === '[object Function]'; },
    isPlainObject: function(obj) { return obj != null && typeof obj === 'object' && Object.prototype.toString.call(obj) === '[object Object]'; },

    NotFoundComponent: Vue.extend({ template: '<div><h4>Screen not found</h4></div>' }),
    EmptyComponent: Vue.extend({ template: '<div><div class="spinner"><div>Loading…</div></div></div>' }),

    LruMap: function(limit) {
        this.limit = limit; this.valueMap = {}; this.lruList = []; // end of list is least recently used
        this.put = function(key, value) {
            var lruList = this.lruList; var valueMap = this.valueMap;
            valueMap[key] = value; this._keyUsed(key);
            while (lruList.length > this.limit) { var rem = lruList.pop(); valueMap[rem] = null; }
        };
        this.get = function (key) {
            var value = this.valueMap[key];
            if (value) { this._keyUsed(key); }
            return value;
        };
        this.containsKey = function (key) { return !!this.valueMap[key]; };
        this._keyUsed = function(key) {
            var lruList = this.lruList;
            var lruIdx = -1;
            for (var i=0; i<lruList.length; i++) { if (lruList[i] === key) { lruIdx = i; break; }}
            if (lruIdx >= 0) { lruList.splice(lruIdx,1); }
            lruList.unshift(key);
        };
    }
};

moqui.templateCache = new moqui.LruMap(20);
moqui.handleLoadError = function (jqXHR, textStatus, errorThrown) {
    // TODO: use a growl notification like in WebrootVue.js handleAjaxError()
    console.error("Load error " + errorThrown + "; status " + textStatus);
};

Vue.component('route-placeholder', {
    props: { location:{type:String,required:true}, options:Object, properties:Object },
    data: function() { return { activeComponent:moqui.EmptyComponent } },
    template: '<component :is="activeComponent" v-bind="properties"></component>',
    mounted: function() {
        var vm = this;
        var jsCompObj = this.options || {};
        var cachedTemplate = moqui.templateCache.get(this.location);
        if (cachedTemplate && cachedTemplate.length) {
            jsCompObj.template = cachedTemplate;
            vm.activeComponent = jsCompObj;
        } else {
            $.ajax({ type:"GET", url:this.location, error:moqui.handleLoadError, success: function (htmlText) {
                jsCompObj.template = htmlText;
                vm.activeComponent = jsCompObj;
                moqui.templateCache.put(vm.location, htmlText);
            }});
        }
    }
});
