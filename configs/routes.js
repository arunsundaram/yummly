module.exports = {
    home: {
        path: '/',
        method: 'get',
        page: 'home',
        title: 'Home',
        action: require('../actions/searchRecipes'),
        handler: require('../components/Home')
    },
    recipe: {
        path: '/recipe/:id',
        method: 'get',
        page: 'recipe',
        title: 'Recipe',
        action: require('../actions/getRecipe'),
        handler: require('../components/Detail')
    }
};
