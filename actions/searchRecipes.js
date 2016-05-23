'use strict';

module.exports = function(context, payload, done) {
    context.dispatch('RECIPES_SEARCH_START', payload);
    var search = payload.query.q || '';
    var start = payload.start || 0;

    context.service.read('search', {search: search, start: start}, {}, function(err, response) {
        if (err || !response) {
            context.dispatch('RECIPES_SEARCH_FAILURE', payload);
            done();
            return;
        }
        if (start > 0) {
            context.dispatch('RECIPES_SEARCH_MORE_SUCCESS', {
                recipes: response.recipes
            });
        }
        else {
            context.dispatch('RECIPES_SEARCH_SUCCESS', {
                recipes: response.recipes,
                attribution: response.attribution
            });
        }

        done();
    });
};
