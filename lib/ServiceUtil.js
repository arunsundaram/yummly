'use strict';

var api = require('../configs/service');

var apiOptions = function(name, query, path) {
    var options = {};
    var key;
    options.url = api.host + api.entry[name].path +
            (path ? '/' + path : '');
    options.headers = {
        'X-Yummly-App-ID': process.env.YUMMLY_APP_ID,
        'X-Yummly-App-Key': process.env.YUMMLY_APP_KEY
    };
    options.qs = {};
    for (key in api.entry[name].params) {
        options.qs[key] = api.entry[name].params[key];
    }
    for (key in query) {
        options.qs[key] = query[key];
    }
    options.json = true;
    return options;
};


var responseHelper = function(err, res) {
    var error = null;
    if (err) {
        error = err;
    } else if (res.statusCode === 400 ||
        res.statusCode === 409 ||
        res.statusCode === 500) {
        error = {
            type: 'ERROR',
            code: res.statusCode,
            message: res.statusMessage
        };
    }
    return error;
};

module.exports = {
    getOptions: apiOptions,
    hasError: responseHelper
};
