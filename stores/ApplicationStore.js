var BaseStore = require('fluxible/addons/BaseStore');
var createStore = require('fluxible/addons').createStore;
var RouteStore = require('./RouteStore');

var ApplicationStore = createStore({
    storeName: 'ApplicationStore',

    handlers: {
        'NAVIGATE_SUCCESS': 'handlePageTitle'
    },

    initialize: function() {
        this.pageTitle = '';
    },

    handlePageTitle: function (currentRoute) {
        var self = this;
        self.dispatcher.waitFor(RouteStore, function() {
            if (currentRoute && currentRoute.title) {
                self.pageTitle = currentRoute.title;
                self.emitChange();
            }
        });
    },

    getPageTitle: function () {
        return this.pageTitle;
    },

    dehydrate: function () {
        return {
            pageTitle: this.pageTitle
        };
    },

    rehydrate: function (state) {
        this.pageTitle = state.pageTitle;
    }
});

module.exports = ApplicationStore;
