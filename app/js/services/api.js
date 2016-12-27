!(function (angular, undefined) {

    'use strict';

    /**
     * :: CONCEPT ::
     * The idea of this file is to abstract the http endpoint from the controller
     * because ideally the controller shouldn't know or care about where the data comes from
     *
     * We create a wrapper for the $http service provided by angular
     * We use our methods to call the $http service therefore decoupling the controller from the data
     * We can inject this as a service throughout our angular application
     */

    angular.module('guide').factory('apiService', ['$http', function ($http) {

        // returned object scope
        return {

            getToken: function () {
                return window.token;
            },

            setToken: function (token) {
                window.token = token;
            },

            makeGetCall: function (url) {
                return $http.get('/api.php?token=' + this.getToken() + '&' + url.replace(/^(&|\?)/, ''));
            },

            makePostCall: function (data) {
                return $http.post('/api.php', data).then(function (result) {
                    return result.data;
                });
            },

            doLogin: function (login) {
                // return the $http promise
                return this.makeGetCall('login=true&email=' + login.email + '&password=' + login.password)
                    .then(function (result) {
                        // resolve the promise with result.data
                        return result.data;
                    });
            },

            getTableData: function (table, columns) {
                // return a promise
                return this.makeGetCall('table=' + table + '&columns=' + columns)
                    .then(function (result) {
                        // return the data
                        return result.data;
                    });
            },

            updateRecord: function (formData) {
                return this.makePostCall(formData);
            },

            makeGlobal: function () {
                window.apiService = this;
            }
        };

    }]);

})(angular);