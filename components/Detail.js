/*globals document*/
'use strict';
var React = require('react');
var SearchBar = require('./SearchBar');
var RecipeDetail = require('./RecipeDetail');
var provideContext = require('fluxible-addons-react/provideContext');
var handleRoute = require('fluxible-router').handleRoute;
var handleHistory = require('fluxible-router').handleHistory;

var Detail = React.createClass({
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
                    <RecipeDetail context={this.context} currentRoute={this.props.currentRoute}/>
                </div>
            </div>
        );
    }
});

Detail = handleHistory(Detail);
Detail = handleRoute(Detail);

module.exports = Detail;
