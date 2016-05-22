'use strict';

var createStore = require('fluxible/addons').createStore;

var RecipeStore = createStore({
    storeName: 'RecipeStore',

    handlers: {
        'GET_RECIPE_START': '_getRecipeStart',
        'GET_RECIPE_FAILURE': '_getRecipeFailure',
        'GET_RECIPE_SUCCESS': '_addRecipe'
    },

    initialize: function() {
        this.images = {};
        this.attribution = {};
        this.ingredients = [];
        this.nutrition = [];
        this.source = {};
        this.name = '';
    },

    _getRecipeStart: function() {
        this.emitChange();
    },

    _getRecipeFailure: function() {
        this.emitChange();
    },

    _addRecipe: function(payload) {
        this.images = payload.images;
        this.attribution = payload.attribution;
        this.ingredients = payload.ingredients;
        this.nutrition = payload.nutrition;
        this.source = payload.source;
        this.name = payload.name;
    },

    getIngredients: function() {
        return this.ingredients;
    },

    getImages: function() {
        return this.images;
    },

    getNutrition: function() {
        return this.nutrition;
    },

    getSource: function() {
        return this.source;
    },

    getName: function() {
        return this.name;
    },

    getAttribution: function() {
        return this.attribution;
    },

    dehydrate: function() {
        return {
            name: this.name,
            ingredients: this.ingredients,
            nutrition: this.nutrition,
            source: this.source,
            images: this.images,
            attribution: this.attribution
        };
    },

    rehydrate: function(state) {
        this.name = state.name;
        this.nutrition = state.nutrition;
        this.source = state.source;
        this.images = state.images;
        this.ingredients = state.ingredients;
        this.attribution = state.attribution;
    }
});

module.exports = RecipeStore;
