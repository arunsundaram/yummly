/*globals document*/
'use strict';
var React = require('react');
var Grid = require('react-bootstrap/lib/Grid');
var NavLink = require('fluxible-router').NavLink;
var Attribution = require('./Attribution');
var Image = require('react-bootstrap/lib/Image');
var connectToStores = require('fluxible-addons-react/connectToStores');
var SearchStore = require('../stores/SearchStore');
var searchRecipes = require('../actions/searchRecipes');
var RouteStore = require('fluxible-router').RouteStore;

var Recipes = React.createClass({

    triggerSearch: function(e) {
        if (e.target.id && e.target.id === 'more') {
            var self = this;
            self.start = self.start || 0;
            self.start += 30;
            self.props.context.executeAction(searchRecipes,
                {query: {q: self.currentQuery}, start: self.start}
            );
        }
    },

    componentWillUpdate: function(nextProps, nextState) {
        var self = this;
        var route = self.routeStore.getCurrentRoute();
        self.currentQuery = route && route.query.q || '';
    },

    componentWillMount: function() {
        var self = this;
        self.routeStore = self.props.context.getStore(RouteStore);
        var route = self.routeStore.getCurrentRoute();
        self.currentQuery = route && route.query.q || '';
    },

    componentDidMount: function() {
        var self = this;
        var wrap = document.getElementById('wrap');
        wrap.addEventListener('click', self.triggerSearch);
    },

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

    renderMoreControl: function() {
        if (this.currentQuery) {
            return (
                <div id='more'>
                    see more results
                </div>
            );
        }
        return false;
    },

    render: function () {
        var self = this;
        var content = '';

        if (self.props.error) {
            content = (
                <div className='err'>
                    Failed to fetch results
                </div>
            );
        }
        else {
            content = (
                <div>
                    <Grid className='cards'>
                        {self.renderRecipes()}
                    </Grid>
                    {self.renderMoreControl()}
                    <Attribution attribution={this.props.attribution} />
                </div>
            );
        }

        return (
            <div id='wrap'>
                {content}
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
