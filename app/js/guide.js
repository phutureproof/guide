!(function($, angular, undefined) {

    angular.module('guide', []);

    angular.getToken = function () {
        return window.token;
    };

    angular.getComponentTemplate = function(component) {
        return '/js/components/' + component + '/' + component + '.php';
    };

    $(function(){
        $(document).on('click', '.modal-confirm', function(event){
            window.htmlService.showAlert('Confirming modal.');
            var formData = window.htmlService.getModalFormData();
            window.apiService.updateRecord(formData).then(function(result){
                window.htmlService.showAlert(result.message, result.status);
                window.htmlService.showAlert('Refreshing data source.');
                window.activeController.refresh();
            });
        });

        $(document).on('submit', '.modal-content form', function(event){
            event.preventDefault();
            $(this).parents('.modal-content').find('.modal-confirm').trigger('click');
        });

        $(document).on('click', '.modal-close', function(event){
            window.htmlService.showAlert('Modal window closing.');
        });
    });

})(jQuery, angular);