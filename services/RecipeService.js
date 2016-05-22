'use strict';
var mockService = require('./mock_data/mockRecipeService.js');

module.exports = {
    name: 'recipe',
    read: function(req, resource, params, config, callback) {
        var response = mockService;

        if (!response) {
            callback({'error': 'failed'}, null);
        }

        callback(null, {
            images: response.images[0],
            name: response.name,
            ingredients: response.ingredientLines,
            attribution: response.attribution,
            nutrition: response.nutritionEstimates,
            source: response.source
        });
    }
};
