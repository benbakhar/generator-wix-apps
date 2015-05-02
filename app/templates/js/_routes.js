'use strict';

var settingsRouter    = require('./api/settings/router');

module.exports = function(app) {

    app.get('/', function(req, res){
        res.sendfile('helloWorld.html');
    });

    app.use('/users', settingsRouter);


};
