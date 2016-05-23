var React = require('react');

var Attribution = React.createClass({
    render: function () {
        var attrib = this.props.attribution.html || '';
        return (
            <div
                className='attrib'
                dangerouslySetInnerHTML = {{__html: attrib}}
            />
        );
    }
});

module.exports = Attribution;
