'use strict';

var createStore = require('fluxible/addons').createStore;

var SearchStore = createStore({
    storeName: 'SearchStore',

    handlers: {
        'RECIPES_SEARCH_START': '_recipesSearchStart',
        'RECIPES_SEARCH_FAILURE': '_recipesSearchFailure',
        'RECIPES_SEARCH_SUCCESS': '_addRecipes'
    },

    initialize: function() {
        this.recipes = [];
        this.attribution = {};
    },

    _recipesSearchStart: function() {
        this.emitChange();
    },

    _recipesSearchFailure: function() {
        this.emitChange();
    },

    _addRecipes: function(payload) {
        this.recipes = payload.recipes;
        this.attribution = payload.attribution;
    },

    getAllRecipes: function() {
        return this.recipes;
    },

    getAttribution: function() {
        return this.attribution;
    },

    dehydrate: function() {
        return {
            recipes: this.recipes,
            attribution: this.attribution
        };
    },

    rehydrate: function(state) {
        this.recipes = state.recipes;
        this.attribution = state.attribution;
    }
});

module.exports = SearchStore;
