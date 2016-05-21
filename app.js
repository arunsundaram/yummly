var Fluxible = require('fluxible');
var Application = require('./components/Application');

// Plugins
var fetchrPlugin = require('fluxible-plugin-fetchr');

// Stores
var ApplicationStore = require('./stores/ApplicationStore');
var RouteStore = require('./stores/RouteStore');
var SearchStore = require('./stores/SearchStore');
var RecipeStore = require('./stores/RecipeStore');

// create new fluxible instance
var app = new Fluxible({
    component: Application
});

app.plug(fetchrPlugin({
    xhrPath: '/api'
}));

// register stores
app.registerStore(RouteStore);
app.registerStore(ApplicationStore);
app.registerStore(SearchStore);
app.registerStore(RecipeStore);

module.exports = app;
