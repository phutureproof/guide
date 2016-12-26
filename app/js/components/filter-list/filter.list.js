!(function (angular, undefined) {

    'use strict';

    angular.module('guide').component('guideFilterList', {
        templateUrl: angular.getComponentTemplate ('filter-list'),
        controller:  function FilterListController($http, $element, apiService, htmlService) {

            this.data = [];

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
                that.data = [];
                if (that.getTable()) {
                    var columns = that.shownData() ? that.shownData() : null;
                    apiService.getTableData(that.getTable(), columns).then(function (result) {
                        that.data = result.data;
                        if(columns) {
                            var newData = [];
                            angular.forEach(that.data, function(article, i){

                                var newArticle = {};
                                for(var key in article) {
                                    if(columns.indexOf(key) >= 0 || key === 'id') {
                                        newArticle[key] = article[key];
                                    }
                                }

                                newData.push(newArticle);
                            });
                            that.data = newData;
                        }
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
                var config = {
                    shown: this.shownData(),
                    hidden: this.hiddenData()
                };
                htmlService.getEditForm(article, this.getTable(), config);
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
                            if(that.shownData()) {
                                if(that.shownData().indexOf(i) >= 0 || i === 'id') {
                                    headers.push(i);
                                }
                            } else {
                                headers.push(i);
                            }
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