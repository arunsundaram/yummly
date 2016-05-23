'use strict';

var request = require('request');
var mockService = require('./mock_data/mockRecipeService.js');
var ServiceUtil = require('../lib/ServiceUtil');

module.exports = {
    name: 'recipe',
    read: function(req, resource, params, config, callback) {
        var searchId = params.searchId || '';

        var responseHandler = function(err, res, body) {
            var error = ServiceUtil.hasError(err, res);
            if (error) {
                callback(error, null);
            }

            callback(null, {
                images: body.images[0],
                name: body.name,
                ingredients: body.ingredientLines,
                attribution: body.attribution,
                nutrition: body.nutritionEstimates,
                source: body.source
            });
        };
        request(ServiceUtil.getOptions(this.name, {}, searchId), responseHandler);

        // Mock Data
        // var response = mockService;
        // responseHandler(null, {}, response);
    }
};
