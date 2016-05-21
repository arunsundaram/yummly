/*globals document*/

var React = require('react');
var Nav = require('./Nav');
var ApplicationStore = require('../stores/ApplicationStore');
var connectToStores = require('fluxible-addons-react/connectToStores');
var provideContext = require('fluxible-addons-react/provideContext');
var handleHistory = require('fluxible-router').handleHistory;
var pages = require('../configs/routes');

var Application = React.createClass({
    render: function () {
        var Handler = this.props.currentRoute.handler;

        return (
            <div>
                <Nav currentRoute={this.props.currentRoute} links={pages} />
                <Handler />
            </div>
        );
    },

    componentDidUpdate: function (prevProps, prevState) {
        if (this.props.pageTitle === prevProps.pageTitle) {
            return;
        }
        document.title = this.props.pageTitle;
    }
});

Application = connectToStores(
    Application,
    [ApplicationStore],
    function(context, props){
        var appStore = context.getStore(ApplicationStore);
        return {
            pageTitle: appStore.getPageTitle()
        };
    }
);

Application = handleHistory(Application);

Application = provideContext(Application);

module.exports = Application;
