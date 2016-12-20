(function() {
'use strict';

/**
 * @ngdoc directive
 * @name nanodesuApp.directive:SearchDirective
 * @description
 * Directive search form for table 
 */
angular.module('nanodesuApp')
    .directive('ndSearch', function(){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'views/templates/search.html'
        };
    });
})();
