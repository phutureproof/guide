!(function ($, angular, undefined) {

    'use strict';

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
        var returnObject = {

            // somewhere to store our alert messages
            alerts: alerts,

            // extract form data in a '.modal-content form'
            getModalFormData: function () {
                return $('.modal-content form').serialize();
            },


            getColumnInfoFromKey: function (key, columns) {
                var columnDataObject = false;
                angular.forEach(columns, function (column, i) {
                    if (column.Field === key) {
                        columnDataObject = columns[i];
                    }
                });
                return columnDataObject;
            },


            // create the html neccessary to update an article
            getEditForm: function (article, table, config, columns) {

                // make sure we can loop on columns
                columns = columns || [];

                // set modal html
                $('.modal').find('.modal-title').html('Editing ' + table.replace('_', ' ') + ': ' + article.id);
                $('.modal').find('.modal-body').empty().append('<form action="" method="post" accept-charset="utf-8" />');

                // append a form to the modal
                var form = $('.modal').find('.modal-body form');

                // add hidden inputs
                form.append('<input name="token" value="' + apiService.getToken() + '" type="hidden" />');
                form.append('<input name="table" value="' + table + '" type="hidden" />');

                // loop over keys in article
                for (var i in article) {

                    if (i === 'id') {

                        form.append('<input name="id" value="' + article[i] + '" type="hidden" />');
                    }

                    // dodge $$hashKey and id
                    if (['$$hashKey', 'id'].indexOf(i) === -1) {


                        var tag;
                        var columnInfo = this.getColumnInfoFromKey(i, columns);
                        var maxlength  = false;
                        var minlength  = false;
                        var required   = false;

                        if (columnInfo) {

                            // at this point we have the data for the column type we can normalise here
                            // maxlength
                            var inputType = columnInfo.Type;
                            maxlength     = inputType.match(/\((\d+)\)$/);
                            try {
                                maxlength = (typeof(maxlength) === 'object' && (maxlength[1])) ? 'maxlength="' + maxlength[1] + '"' : false;
                            } catch (e) {
                                // sometimes typeof(maxlength) was actually an array and breaking things who knows
                            }

                            //minlength
                            if (maxlength) {
                                minlength = 'minlength="1"';
                            }

                            // required
                            required = (columnInfo.Null === 'NO') ? 'required' : '';


                            // what type of input are we dealing with
                            // text inputs
                            if (inputType.match(/(varchar|int|decimal|float|datetime)/)) {
                                tag = $('<div class="form-group"><label>' + i.replace('_', ' ') + '</label><input class="form-control" name="columns[' + i + ']" value="' + article[i] + '" type="text" ' + required + ' ' + maxlength + ' ' + minlength + '/></div>');
                            }

                            // textarea inputs
                            if (inputType.match(/(text)/)) {
                                tag = $('<div class="form-group"><label>' + i.replace('_', ' ') + '</label><textarea class="form-control" name="columns[' + i + ']" ' + required + ' ' + maxlength + ' ' + minlength + '>' + article[i] + '</textarea></div>');
                            }

                            // enums!
                            if (inputType.match(/(enum)/)) {
                                tag = $('<div class="form-group"><label>' + i.replace('_', ' ') + '</label><select class="form-control" name="columns[' + i + ']" ' + required + '></select></div>');

                                var values = inputType.match(/enum\((.*)\)/);
                                var selected;
                                try {
                                    if (values) {
                                        values = values[1].split(',');
                                        for (var value in values) {
                                            value    = values[value].replace(/^'|'$/g, '');
                                            selected = (article[i] === value) ? 'selected' : '';
                                            tag.find('select').append('<option value="' + value + '" ' + selected + '>' + value + '</option>');
                                        }
                                    }
                                } catch (e) {
                                }
                            }

                        } else if (i === 'delete') {

                            tag = $('<div class="form-group"><label>' + i.replace('_', ' ') + '</label><input class="form-control" name="columns[' + i + ']" value="' + article[i] + '" type="text" /><span class="help-block">Please enter a value to confirm deletion,</span></div>');

                        } else {

                            tag = $('<div class="form-group"><label>' + i.replace('_', ' ') + '</label><input class="form-control" name="columns[' + i + ']" value="' + article[i] + '" type="text" /></div>');

                        }

                        // if we're using data-shown we might as well double check we're only displaying the chosen columns
                        if (config.shown) {

                            // if this key is shown
                            if (config.shown.indexOf(i) >= 0) {

                                form.append(tag);
                            }

                            // or we're not using data-shown
                        } else {

                            form.append(tag);

                        }
                    }
                }
                // show the modal
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
                    '<button type="button" class="btn btn-primary modal-confirm">Save changes</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                ).appendTo('body');
            },

            closeModal: function () {
                $('.modal').modal('hide');
            },


            stopAlertsListener: function () {
                clearTimeout(timer);
            },


            doBindings: function () {
                // $('.sortable').sortable({items: '.row'});
            },


            makeGlobal: function () {
                window.htmlService = this;
            }
        };

        return returnObject;

    });

})(jQuery, angular);