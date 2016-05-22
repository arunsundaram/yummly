'use strict';
var mockService = require('./mock_data/mockSearchService.js');

module.exports = {
    name: 'search',
    read: function(req, resource, params, config, callback) {
        var response = mockService;

        if (!response || !response.matches || !response.matches.length) {
            callback({'error': 'failed'}, null);
        }

        callback(null, {
            recipes: response.matches,
            attribution: response.attribution
        });
    }
};
