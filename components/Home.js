/*globals document*/
'use strict';
var React = require('react');
var SearchBar = require('./SearchBar');
var Recipes = require('./Recipes');
var provideContext = require('fluxible-addons-react/provideContext');
var handleRoute = require('fluxible-router').handleRoute;
var handleHistory = require('fluxible-router').handleHistory;

var Home = React.createClass({
    contextTypes: {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired
    },

    componentDidMount: function() {
        var self = this;
    },
    render: function () {
        return (
            <div>
                <SearchBar context={this.context} currentRoute={this.props.currentRoute}/>
                <div className='main'>
                    <Recipes context={this.context} currentRoute={this.props.currentRoute}/>
                </div>
            </div>
        );
    }
});

Home = handleHistory(Home);
Home = handleRoute(Home);

module.exports = Home;
