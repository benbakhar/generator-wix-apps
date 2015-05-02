'use strict';

var usersOutAPI = require('./usersAPI');
var express = require('express');
var router = express.Router();

module.exports = router;


router.get('', function(req, res) {

    res.promise(usersOutAPI.getList(req))

});