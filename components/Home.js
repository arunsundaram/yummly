/*globals document*/
'use strict';
var React = require('react');
var searchRecipes = require('../actions/searchRecipes');
var getRecipe = require('../actions/getRecipe');

var Home = React.createClass({
    contextTypes: {
        executeAction: React.PropTypes.func.isRequired
    },

    componentDidMount: function() {
        var self = this;
        var srch = document.getElementById('search');
        srch.addEventListener('click', function(e) {
            self.context.executeAction(searchRecipes);
        });
        var view = document.getElementById('recipe');
        view.addEventListener('click', function(e) {
            self.context.executeAction(getRecipe);
        });
    },
    render: function () {
        return (
            <div>
                <h2>Home</h2>
                <p>Welcome to the site!</p>
                <button id='search'>Search</button>
                <button id='recipe'>View</button>
            </div>
        );
    }
});

module.exports = Home;
