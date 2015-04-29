'use strict';

var Q = require('q');

var app,
    logger;

// Configuration Params
function configure () {

    //TODO apply ENV configuration using nconf

    // Logger
    var winston = require('winston');
    logger = new (winston.Logger)({
        transports : [
            new (winston.transports.Console)({level : 'debug'})
        ]
    });

    return Q.resolve();
}

// create db connections
function connectDatabases () {
    return require('./server/config/db');
}

// init the models
function initModels () {
    //require('users/init');
}

// Set up our express application
function setupApp () {

    var express = require('express');
    app = express();

    var cors = require('cors'),
        morgan = require('morgan'),
        bodyParser = require('body-parser'),
        expressValidator = require('express-validator'),
        methodOverride = require('method-override');
    //restAPIFormatter = require('Core').restAPIFormatter,
    //errorHandler = require('Core').errorHandler;

    //app.set('view engine', 'ejs');
    app.use(cors());
    app.use(morgan('dev'));                                 // log every request to the console
    app.use(methodOverride());                              // simulate DELETE and PUT
    app.use(bodyParser.urlencoded({extended : false}));    // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                             // parse application/json

    //app.use('/js', express.static('views/js', {extensions: ['js']})); // static js files


    app.use(expressValidator(
        //{customValidators : customValidators}
    ));
    //app.use(restAPIFormatter);

    // Set App routes
    require('./routes')(app);
    app.use(express.static(__dirname));

    //app.use(errorHandler);
}

// Run the server
function runServer () {
    var http = require('http');
    var port = 3010;

    http.createServer(app).listen(port, function () {
        logger.info('Express server listening on port : ' + port);
        logger.info('Visit localhost:' + port + ' and checkout your new app!');
    });
}


configure()
    .then(initModels)
    .then(connectDatabases)
    .then(setupApp)
    .then(runServer);

process.on('uncaughtException', function (err) {
    console.error('Error: uncaughtException:');
    console.error(err);
});
