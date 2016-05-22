/**
 * This leverages Express to create and run the http server.
 * A Fluxible context is created and executes the navigateAction
 * based on the URL. Once completed, the store state is dehydrated
 * and the application is rendered via React.
 */

var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');
var path = require('path');
var serialize = require('serialize-javascript');
var navigateAction = require('fluxible-router').navigateAction;
var debugLib = require('debug');
var React = require('react');
var ReactDOM = require('react-dom/server');
var app = require('./app');
var HtmlComponent = require('./components/Html');
var createElementWithContext = require('fluxible-addons-react').createElementWithContext;

const env = process.env.NODE_ENV;

const debug = debugLib('yummly');

const server = express();
server.use('/public', express.static(path.join(__dirname, '/build')));
server.use(cookieParser());
server.use(compression());
server.use(bodyParser.json());
server.use(csrf({cookie: true}));

// Fetchr Integration
var fetchrPlugin = app.getPlugin('FetchrPlugin');

// Register Services
fetchrPlugin.registerService(require('./services/SearchService'));
fetchrPlugin.registerService(require('./services/RecipeService'));

server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

server.use(function (req, res, next) {
    const context = app.createContext({
        req: req,
        xhrContext: {
            lang: 'en-US',
            _csrf: req.csrfToken()
        }
    });

    debug('Executing navigate action');
    context.getActionContext().executeAction(navigateAction, {
        url: req.url
    }, (err) => {
        if (err) {
            if (err.statusCode && err.statusCode === 404) {
                // Pass through to next middleware
                next();
            } else {
                next(err);
            }
            return;
        }

        debug('Exposing context state');
        const exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

        debug('Rendering Application component into html');
        const markup = ReactDOM.renderToString(createElementWithContext(context));
        const htmlElement = React.createElement(HtmlComponent, {
            clientFile: env === 'production' ? 'main.min.js' : 'main.js',
            context: context.getComponentContext(),
            state: exposed,
            markup: markup
        });
        const html = ReactDOM.renderToStaticMarkup(htmlElement);

        debug('Sending markup');
        res.type('html');
        res.write('<!DOCTYPE html>' + html);
        res.end();
    });
});

const port = process.env.PORT || 3000;
server.listen(port);
console.log('Application listening on port ' + port);

module.exports = {
    server: server
};
