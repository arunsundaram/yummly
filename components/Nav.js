var React = require('react');
var NavLink = require('fluxible-router').NavLink;

var Nav = React.createClass({
    getDefaultProps: function() {
        return {
            selected: null,
            links: {}
        };
    },

    render: function () {
        const selected = this.props.currentRoute;
        const links = this.props.links;

        const linkHTML = Object.keys(links).map((name) => {
            var className = '';
            var link = links[name];

            if (selected && selected.name === name) {
                className = 'pure-menu-selected';
            }

            return (
                <li className={className} key={link.path}>
                    <NavLink routeName={link.page} activeStyle={{backgroundColor: '#eee'}}>{link.title}</NavLink>
                </li>
            );
        });

        return (
            <ul className="pure-menu pure-menu-open pure-menu-horizontal">
                {linkHTML}
            </ul>
        );
    }
});

module.exports = Nav;
