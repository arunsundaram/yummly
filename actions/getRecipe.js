'use strict';

module.exports = function(context, payload, done) {
    context.dispatch('GET_RECIPE_START', payload);
    var searchId = payload.params.id || '';

    context.service.read('recipe', {searchId: searchId}, {}, function(err, response) {
        if (err || !response) {
            context.dispatch('GET_RECIPE_FAILURE', payload);
            done();
            return;
        }
        context.dispatch('GET_RECIPE_SUCCESS', response);
        done();
    });
};
