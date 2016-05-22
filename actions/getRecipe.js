'use strict';

module.exports = function(context, payload, done) {
    context.dispatch('GET_RECIPE_START', payload);

    context.service.read('recipe', {}, {}, function(err, response) {
        if (err || !response) {
            context.dispatch('GET_RECIPE_FAILURE', payload);
            done();
            return;
        }
        context.dispatch('GET_RECIPE_SUCCESS', {
            recipe: response
        });
        done();
    });
};
