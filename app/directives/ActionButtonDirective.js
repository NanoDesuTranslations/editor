(function() {
'use strict';

/**
 * @ngdoc directive
 * @name nanodesuApp.directive:ActionButtonDirective
 * @description
 * Directive directive for edit and delete button 
 */
angular.module('nanodesuApp')
    .directive('ndAction', function(){
        return {
            restrict: 'E',
            replace: true,
            scope: {
                edit: '@',
                delete: '&'
            },
            templateUrl: 'views/templates/action_button.html'
        };
    });
})();
 
