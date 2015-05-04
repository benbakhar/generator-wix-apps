'use strict';

var mongoose      = require('mongoose'),
    Q             = require('q'),
    logger        = require('winston'),
    config        = require('./config.json').MongoDB;

var dbURI = 'mongodb://' + config.host + ':' + config.port + '/' + config.db,
    opts = {};

return Q.ninvoke(mongoose,'connect',dbURI,opts)
    .then(function(){

        mongoose.connection.on('error', function (err) {
            logger.error('Mongoose default connection error', err);
        });

        // When the connection is disconnected
        mongoose.connection.on('disconnected', function () {
            logger.warn('Mongoose default connection disconnected');
        });

        // If the Node process ends, close the Mongoose connection
        process.on('SIGINT', function () {
            mongoose.connection.close(function () {
                logger.warn('Mongoose default connection disconnected through app termination');
                process.exit(0);
            });
        });

        // When reconnected
        mongoose.connection.on('connected', function () {
            logger.info('Mongoose reconnected to ' + dbURI);
        });

        // When successfully connected
        logger.info('Mongoose connection initialized to ' + dbURI);

        return Q.resolve();
    });