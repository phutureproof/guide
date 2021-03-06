!(function (Cookies, angular, undefined) {

    'use strict';

    /**
     * :: CONCEPT ::
     * Abstract cookie handling from the controllers
     * Provide an injectable service to take care of cookie data
     */

    angular.module('guide').factory('cookieService', function () {

        // returned object scope
        return {
            get: function(key) {
                return (Cookies.get(key) !== 'undefined') ? Cookies.get(key) : null;
            },
            set: function (key, value, lengthInDays) {
                lengthInDays = lengthInDays || 7;
                return Cookies.set(key, value, {expires: lengthInDays});
            }
        }

    });

})(Cookies, angular);