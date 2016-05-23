'use strict';

module.exports = function(context, payload, done) {
    context.dispatch('RECIPES_SEARCH_START', payload);
    var search = payload.query.q || '';

    context.service.read('search', {search: search}, {}, function(err, response) {
        if (err || !response) {
            context.dispatch('RECIPES_SEARCH_FAILURE', payload);
            done();
            return;
        }
        context.dispatch('RECIPES_SEARCH_SUCCESS', {
            recipes: response.recipes,
            attribution: response.attribution
        });
        done();
    });
};
