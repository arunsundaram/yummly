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
        this.dispatcher.waitFor(RouteStore, () => {
            if (currentRoute && currentRoute.title) {
                this.pageTitle = currentRoute.title;
                this.emitChange();
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
