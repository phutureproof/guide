!(function (angular, undefined) {

    angular.module('guide').component('guideFilterList', {
        templateUrl: angular.getComponentTemplate ('filter-list'),
        controller:  function FilterListController($http, $element, apiService, htmlService) {

            this.getTable = function () {
                return $element[0].dataset.table || null;
            };

            this.shownData = function () {
                return $element[0].dataset.shown || null;
            };

            this.hiddenData = function () {
                return $element[0].dataset.hidden || null;
            };

            var that = this;

            this.refresh = function () {
                if (that.getTable()) {
                    apiService.getTableData(that.getTable()).then(function (result) {
                        that.data = result.data;
                    });
                }
            };

            this.getDisplayText = function (article) {
                if (article.hasOwnProperty('email')) {
                    return article.id + ' ' + article.email;
                } else if (article.hasOwnProperty('name')) {
                    return article.id + ' ' + article.name;
                } else if (article.hasOwnProperty('id')) {
                    return article.id;
                }
            };

            this.getHeadingText = function () {
                return that.getTable().replace('_', ' ') || false;
            };

            this.getEditForm = function (article) {
                htmlService.showAlert('Loading data into form...');
                htmlService.getEditForm(article, this.getTable());
                htmlService.showAlert('Opening form.');
                window.activeController = this;
            };

            this.getCreateForm = function(article) {
                console.log(article);
            };

            this.getDataHeaders = function () {
                var headers = [];
                if (this.data && this.data.length) {
                    for (var i in this.data[0]) {
                        if (i !== '$$hashKey') {
                            headers.push(i);
                        }
                    }
                    headers.push('options');
                }
                return headers;
            };

            this.refresh();

        }
    });

})(angular);