'use strict';

var usersRouter    = require('./api/users/router');

module.exports = function(app) {

    app.get('/', function(req, res){
        res.sendfile('helloWorld.html');
    });

    app.use('/users', usersRouter);


};
