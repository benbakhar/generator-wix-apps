'use strict';

var usersAPI = require('./api/users/usersAPI');

module.exports = function(app) {

    app.get('/', function(req, res){
        res.sendfile('app/widget/widget.html');
    });

    // Category Routes
    app.route('/users')
        .get(usersAPI.getList);

};
