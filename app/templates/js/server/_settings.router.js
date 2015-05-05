'use strict';

var settingsAPI = require('./settingsAPI');
var express = require('express');
var router = express.Router();

module.exports = router;


router.get('', function(req, res) {

    res.promise(settingsAPI.getList(req));

});