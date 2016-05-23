/*globals document, window*/
'use strict';
var React = require('react');
var searchRecipes = require('../actions/searchRecipes');
var NavLink = require('fluxible-router').NavLink;
var Form = require('react-bootstrap/lib/Form');
var FormGroup = require('react-bootstrap/lib/FormGroup');
var FormControl = require('react-bootstrap/lib/FormControl');
var Button = require('react-bootstrap/lib/Button');
var navigateAction = require('fluxible-router').navigateAction;
var RouteStore = require('fluxible-router').RouteStore;


var SearchBar = React.createClass({

    triggerSearch: function(e) {
        e.preventDefault();

        var query = document.getElementById('query').value;
        var path = this.props.context.getStore(RouteStore).makePath('home');
        var url = path + '?q=' + query;

        window.onbeforeunload = null;
        window.history.pushState({query: {q: query}}, 'yummly', url);
        this.props.context.executeAction(navigateAction, {
            method: 'GET',
            url: url,
            type: 'pageload'
       });
    },

    componentDidMount: function() {
        var self = this;
        var route = self.props.context.getStore(RouteStore).getCurrentRoute();
        var currentQuery = route && route.query.q;
        var srchBox = document.getElementById('query');
        var srchForm = document.getElementById('searchForm');

        srchBox.value = currentQuery || '';
        srchForm.addEventListener('submit', self.triggerSearch);
    },

    render: function () {
        return (
            <div className='header'>
                <span className='logo'>
                    <NavLink href='/'>
                        <img src='/public/static/img/yummly_logo.png'/>
                    </NavLink>
                </span>
                <div className='searchbox'>
                    <Form id='searchForm' action='/' inline>
                        <FormGroup>
                            <FormControl type='text' placeholder='Search recipes' id='query' name='q'/>
                            <Button type='submit' id='search'>Search</Button>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        );
    }
});

module.exports = SearchBar;
