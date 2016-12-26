!(function (angular, undefined) {

    angular.module('guide').component('guideUi', {
        templateUrl: angular.getComponentTemplate('guide-ui'),
        controller:  function GuideUiController(apiService, htmlService, cookieService) {

            apiService.makeGlobal();
            htmlService.createModal();
            htmlService.startAlertsListener();
            htmlService.makeGlobal();

            this.getDefaultData = function () {
                return {
                    email:    cookieService.get('login-email'),
                    username: '',
                    password: '',
                    done:     false,
                    error:    false,
                    remember: true
                }
            };

            this.login = this.getDefaultData();

            var that = this;

            this.doLogin = function () {
                htmlService.showAlert('Logging in...');
                apiService.doLogin(that.login).then(function (result) {
                    if (result.login.done === true) {
                        htmlService.showAlert('Login successful, refreshing interface, welcome ' + result.login.username + ' :)', 'success');
                        if(that.login.remember) {
                            cookieService.set('login-email', that.login.email);
                            htmlService.showAlert('Login cookie created and saved.');
                        }
                        that.login = angular.extend(that.login, result.login);
                    } else {
                        htmlService.showAlert('Aww, we couldn\'t find any records matching the details you supplied :(', 'danger');
                    }
                });

            };

            this.doLogout = function () {
                that.login = that.getDefaultData();
            };

        }
    });

})(angular);