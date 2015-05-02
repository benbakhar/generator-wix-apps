'use strict';

var mongoose            = require('mongoose'),
    Schema              = mongoose.Schema;

var SettingSchema = new Schema({

    username: String

});

var settingModel = mongoose.model('Setting', SettingSchema);

module.exports = settingModel;