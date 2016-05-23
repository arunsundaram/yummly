/*globals document*/
'use strict';
var React = require('react');
var Grid = require('react-bootstrap/lib/Grid');
var NavLink = require('fluxible-router').NavLink;
var Attribution = require('./Attribution');
var Image = require('react-bootstrap/lib/Image');
var connectToStores = require('fluxible-addons-react/connectToStores');
var SearchStore = require('../stores/SearchStore');

var Recipes = React.createClass({

    renderRecipes: function() {
        return this.props.recipes.map(function(item) {
            return (
                <NavLink href={'/recipe/' + item.id} id={item.id} key={item.id} className='card'>
                    <Image src={item.imageUrlsBySize['90']} thumbnail/>
                    <span className='title grad'>
                        {item.recipeName}
                    </span>
                </NavLink>
            );
        });
    },

    render: function () {
        var self = this;
        if (self.props.error) {
            return (
                <div className='err'>
                    Failed to fetch results
                </div>
            );
        }
        return (
            <div>
                <Grid className='cards'>
                    {self.renderRecipes()}
                </Grid>
                <Attribution attribution={this.props.attribution} />
            </div>
        );
    }
});

Recipes = connectToStores(
    Recipes,
    [SearchStore],
    function(context, props) {
        var searchStore = context.getStore(SearchStore);
        return {
            recipes: searchStore.getAllRecipes(),
            attribution: searchStore.getAttribution(),
            error: searchStore.getError()
        };
    }
);

module.exports = Recipes;
