!(function ($, angular, undefined) {

    'use strict';

    angular.module('guide', []);

    angular.getToken = function () {
        return window.token;
    };

    angular.getComponentTemplate = function (component) {
        return '/js/components/' + component + '/' + component + '.php';
    };

    $(function () {
        $(document).on('click', '.modal-confirm', function (event) {
            event.preventDefault();
            $(this).parents('.modal-content').find('form').trigger('submit');
        });

        $(document).on('submit', '.modal-content form', function (event) {

            event.preventDefault();
            event.stopPropagation();

            var form = $('.modal-content form');

            form.validate();

            if(form.valid()) {
                window.htmlService.showAlert('Collecting form data.');
                var formData = window.htmlService.getModalFormData();
                window.apiService.updateRecord(formData).then(function (result) {
                    window.htmlService.showAlert(result.message, result.status);
                    window.htmlService.showAlert('Refreshing data source.');
                    window.activeController.refresh();
                    window.htmlService.closeModal();
                });
            }

            return false;
        });

        $(document).on('click', '.modal-close', function (event) {
            window.htmlService.showAlert('Abandoning form.');
        });

        $(document).on('click', '.panel-heading', function (event) {
            var panel = $(this).parent().find('.panel-body');
            if(panel.hasClass('hidden')) {
                panel.css({display: 'none'}).removeClass('hidden');
            }
            panel.slideToggle();
        });

        $(document).on('click', '.panel-heading button.pull-right', function (event) {
            event.preventDefault();
            event.stopPropagation();
        });
    });

})(jQuery, angular);