/* global */
(function () {
    'use strict';

    function HomeCtrl() {

        this.msg = 'Hello HomeCtrl'
    }

    angular.module('<%= app_name %>')
        .controller('HomeCtrl', [
            '$scope',

            HomeCtrl
        ])

}());