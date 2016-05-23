'use strict';

var createStore = require('fluxible/addons').createStore;

var SearchStore = createStore({
    storeName: 'SearchStore',

    handlers: {
//        'RECIPES_SEARCH_START': '_recipesSearchStart',
        'RECIPES_SEARCH_FAILURE': '_recipesSearchFailure',
        'RECIPES_SEARCH_SUCCESS': '_addRecipes'
    },

    initialize: function() {
        this.recipes = [];
        this.attribution = {};
        this.error = false;
    },

    _recipesSearchStart: function() {
        this.emitChange();
    },

    _recipesSearchFailure: function() {
        this.error = true;
        this.emitChange();
    },

    _addRecipes: function(payload) {
        this.recipes = payload.recipes;
        this.attribution = payload.attribution;
        this.emitChange();
    },

    getAllRecipes: function() {
        return this.recipes;
    },

    getAttribution: function() {
        return this.attribution;
    },

    getError: function() {
        return this.error;
    },

    dehydrate: function() {
        return {
            recipes: this.recipes,
            attribution: this.attribution,
            error: this.error
        };
    },

    rehydrate: function(state) {
        this.recipes = state.recipes;
        this.attribution = state.attribution;
        this.error = state.error;
    }
});

module.exports = SearchStore;
