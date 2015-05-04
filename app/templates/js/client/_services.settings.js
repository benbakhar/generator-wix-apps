/* global */
(function () {
    'use strict';

    function SettingsService($http) {

        console.log('Hello Settings Service');

        //==============================
        //     PRIVATE METHODS         =
        //==============================

        //==============================
        //   FUNCTION DECLARATIONS     =
        //==============================

        //==============================
        //        PUBLIC API           =
        //==============================

    }

    angular.module('<%= app_name %>')
        .factory('SettingsService', [
            '$http',

            SettingsService
        ]);

}());