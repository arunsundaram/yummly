'use strict';

var request = require('request');
var ServiceUtil = require('../lib/ServiceUtil');
var mockService = require('./mock_data/mockSearchService.js');

module.exports = {
    name: 'search',

    read: function(req, resource, params, config, callback) {
        var query = params.search || '';

        var responseHandler = function(err, res, body) {
            var error = ServiceUtil.hasError(err, res);
            if (error) {
                callback(error, null);
            }

            if (!body || !body.matches || !body.matches.length) {
                callback({type: 'ERROR', message: 'No results'}, null);
            }

            callback(null, {
                recipes: body.matches,
                attribution: body.attribution
            });
        };
        request(ServiceUtil.getOptions(this.name, {q: query}), responseHandler);

        // Mock data
        // var response = mockService;
        // responseHandler(null, {}, response);

    }
};
