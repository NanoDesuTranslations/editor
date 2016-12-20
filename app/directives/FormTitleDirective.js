(function() {
'use strict';

/**
 * @ngdoc directive
 * @name nanodesuApp.directive:FormTitleDirective
 * @description
 * Directive for Title and Back Button for every form
 */
angular.module('nanodesuApp')
    .directive('ndTitle', function(){
        return {
            restrict: 'E',
            replace: true,
            scope: {
                title: '@title',
                backUrl: '@url'
            },
            templateUrl: 'views/templates/form_title.html'
        };
    });
})();
 
