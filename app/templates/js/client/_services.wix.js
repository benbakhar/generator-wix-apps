/* global */
(function () {
    'use strict';

    function WixService($q) {

        console.log('Hello Wix Service');

        //==============================
        //   FUNCTION DECLARATIONS     =
        //==============================

        /**
         * Return obj with all site info attributes
         * @returns Promise
         */
        function getSiteInfo() {
            var defer = $q.defer();
            Wix.Settings.getSiteInfo(function(data) {

                if ( !data ) { return defer.reject() }

                var _query = data.url.split('?')[1].split('&'),
                    obj = {},
                    _splitted;
                for ( var i = 0; i < _query.length; i++ ) {
                    _splitted = _query[i].split('=');
                    obj[_splitted[0] ] = _splitted[1];
                }

                defer.resolve(obj);
            });

            return defer.promise;
        }

        /**
         *
         * @returns String
         */
        function getDeviceType() {
            return Wix.Utils.getDeviceType();
        }

        /**
         *
         * @returns String
         */
        function getCompId() {
            return Wix.Utils.getCompId();
        }

        /**
         *
         * @returns String
         */
        function getOrigCompId() {

            function _parseCompIdFromIFrame() {
                var params = {};
                window.location.search.substr(1).split('&').forEach(function(val){
                    val = val.split('=');
                    params[val[0]] = val[1];
                });

                return params.compId;
            }

            return Wix.Utils.getOrigCompId() || _parseCompIdFromIFrame();
        }

        function getInstanceId() {
            return Wix.Utils.getInstanceId();
        }

        /**
         *
         * @returns String
         */
        function getLocale() {
            return Wix.Utils.getLocale();
        }

        /**
         *
         * @returns Promise
         */
        function getUserSession() {
            var defer = $q.defer();

            Wix.Activities.getUserSessionToken(function (token) {
                defer.resolve(token);
            });

            return defer.promise;
        }

        //==============================
        //        PUBLIC API           =
        //==============================

        return {
            getSiteInfo   : getSiteInfo,
            getDeviceType : getDeviceType,
            getCompId     : getCompId,
            getOrigCompId : getOrigCompId,
            getInstanceId : getInstanceId,
            getLocale     : getLocale,
            getUserSession: getUserSession
        }



    }

    angular.module('<%= app_name %>')
        .factory('WixService', [
            '$q',

            WixService
        ]);

}());