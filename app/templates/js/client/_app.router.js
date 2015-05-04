/* global */
(function () {
    'use strict';

    angular.module('<%= app_name %>')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
            function ($stateProvider, $urlRouterProvider, $locationProvider) {

                $urlRouterProvider.otherwise('/');
                $locationProvider.html5Mode(false);

                $stateProvider
                    .state('<%= type %>.layout', {
                        url: '/',
                        templateUrl: 'views/home.html',
                        controller: 'HomeCtrl',
                        controllerAs: 'VM'
                    });
            }]);

}());