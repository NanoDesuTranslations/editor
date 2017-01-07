(function() {
'use strict';

/**
 * @ngdoc directive
 * @name nanodesuApp.directive:FormSubmitDirective
 * @description
 * Directive for Title and Back Button & Submit button for every form
 */
angular.module('nanodesuApp')
    .directive('ndSave', function(){
        return {
            restrict: 'E',
            replace: true,
            scope: {
                title: '@title',
                backUrl: '@url',
                isDone: '@done'
            },
            templateUrl: 'views/templates/form_submit.html'
        };
    });
})();
 
