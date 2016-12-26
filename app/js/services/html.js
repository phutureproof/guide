!(function ($, angular, undefined) {

    angular.module('guide').factory('htmlService', function (apiService) {

        // quick dirty config object
        // could be abstracted
        var config = {
            listenerFunctionRepeatTimer:     99,
            listenerAlertDisplayLengthTimer: 5000,
            jqAnimationSpeed:                250
        };

        // storage outside
        var alerts = [];

        // timer outside
        var timer;

        // encapsulate
        returnObject = {

            // somewhere to store our alert messages
            alerts: alerts,

            // extract form data in a '.modal-content form'
            getModalFormData: function () {
                return $('.modal-content form').serialize();
            },


            // create the html neccessary to update an article
            getEditForm: function (article, table) {
                $('.modal').find('.modal-title').html('Editing ' + table + ': ' + article.id);
                $('.modal').find('.modal-body').empty().append('<form />');
                var form = $('.modal').find('.modal-body form');
                for (var i in article) {
                    if (i === 'id') {
                        form.append('<input name="token" value="' + apiService.getToken() + '" type="hidden" />');
                        form.append('<input name="table" value="' + table + '" type="hidden" />');
                        form.append('<input name="id" value="' + article[i] + '" type="hidden" />');
                    }
                    if (['$$hashKey', 'id'].indexOf(i) === -1) {
                        form.append('<div class="form-group"><label>' + i + '</label><input class="form-control" name="columns[' + i + ']" value="' + article[i] + '" type="text" /></div>');
                    }
                }
                $('.modal').modal('show');
            },


            showAlert: function (message, priority, keepOpen) {
                if (!priority) {
                    priority = 'info';
                }
                if (!keepOpen) {
                    keepOpen = false;
                }

                this.alerts.push({text: message, priority: priority, keepOpen: keepOpen});
            },


            startAlertsListener: function () {

                var timeoutFunction = function () {

                    if (alerts.length > 0 && $('.alerts-container').length) {

                        var message = alerts.shift();

                        var autoclose = '';
                        if (message.keepOpen) {
                            autoclose = '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
                        }

                        var newAlert = $(
                            '<div class="alert alert-' + message.priority + ' alert-dismissible" role="alert">' +
                            autoclose +
                            '<p>' + message.text + '</p>' +
                            '</div>'
                        );

                        newAlert.appendTo('.alerts-container');

                        if (!message.keepOpen) {
                            setTimeout(function () {
                                newAlert.slideUp(config.jqAnimationSpeed, function () {
                                    newAlert.remove();
                                });
                            }, config.listenerAlertDisplayLengthTimer);
                        }

                    }

                    timer = setTimeout(timeoutFunction, config.listenerFunctionRepeatTimer);
                };

                timeoutFunction();

            },

            createModal: function () {
                $(
                    '<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">' +
                    '<div class="modal-dialog modal-lg" role="document">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                    '<h4 class="modal-title" id="myModalLabel">Modal title</h4>' +
                    '</div>' +
                    '<div class="modal-body">' +
                    '</div>' +
                    '<div class="modal-footer">' +
                    '<button type="button" class="btn btn-default modal-close" data-dismiss="modal">Close</button>' +
                    '<button type="button" class="btn btn-primary modal-confirm" data-dismiss="modal">Save changes</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                ).appendTo('body');
            },


            stopAlertsListener: function () {
                clearTimeout(timer);
            },


            makeGlobal: function () {
                window.htmlService = this;
            }
        };

        return returnObject;

    });

})(jQuery, angular);