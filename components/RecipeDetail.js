/*globals document*/
'use strict';
var React = require('react');
var Button = require('react-bootstrap/lib/Button');
var connectToStores = require('fluxible-addons-react/connectToStores');
var RecipeStore = require('../stores/RecipeStore');
var Attribution = require('./Attribution');

var RecipeDetail = React.createClass({
    contextTypes: {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired
    },

    renderIngredients: function() {
        var items = [];
        if (!this.props.ingredients) {
            return false;
        }
        items = this.props.ingredients.map(function(item, i) {
            return (
                <li key={i}>{item}</li>
            );
        });
        if (items.length) {
            return (
                <div className='ingredients'>
                    <h3>Ingredients</h3>
                    <ul>
                        {items}
                    </ul>
                </div>
            );
        }
    },

    renderImageComponent: function() {
        if (!this.props.images || !this.props.name ||
                !this.props.source) {
            return false;
        }

        var imageSrc = this.props.images.imageUrlsBySize['360'] || '';
        var title = this.props.name;
        var sourceName = this.props.source.sourceDisplayName;
        var sourceUrl = this.props.source.sourceSiteUrl;
        if (sourceUrl.indexOf('http')===-1) {
            sourceUrl = 'http://' + sourceUrl;
        }
        return (
            <div className='image-comp'>
                <img src={imageSrc} />
                <div className='caption'>
                    <span className='title'>
                        {title}
                    </span>
                    <span className='source'>
                        From <a href={sourceUrl} target='_blank'>{sourceName}</a>
                    </span>
                </div>
            </div>
        );
    },

    render: function () {
        return (
            <div>
                <div className='recipe'>
                    {this.renderImageComponent()}
                    {this.renderIngredients()}
                </div>
                <Attribution attribution={this.props.attribution} />
            </div>
        );
    }
});

RecipeDetail = connectToStores(
    RecipeDetail,
    [RecipeStore],
    function(context, props) {
        var recipeStore = context.getStore(RecipeStore);
        return {
            images: recipeStore.getImages(),
            attribution: recipeStore.getAttribution(),
            ingredients: recipeStore.getIngredients(),
            nutrition: recipeStore.getNutrition(),
            source: recipeStore.getSource(),
            name: recipeStore.getName(),
            error: recipeStore.getError()
        };
    }
);

module.exports = RecipeDetail;
