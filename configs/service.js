'use strict';

module.exports = {
    host: 'http://api.yummly.com/v1/api/',
    timeout: 5000,
    entry: {
        search: {
            path: 'recipes',
            params: {
                maxResult: 30,
                requirePictures: true
            }
        },
        recipe: {
            path: 'recipe',
            params: {}
        }
    }
};
