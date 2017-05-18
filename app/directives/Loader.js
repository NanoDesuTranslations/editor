(function() {
'use strict'

/**
 * @ngdoc directive
 * @name nanodesuApp.directive:Loader
 * @description
 * Receive broadcast to show or hide loader
 */
angular.module('nanodesuApp')
    .directive('ndLoader', function($log) {

        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'views/templates/loader.html',
            link: function(scope, element) {
                var shownType = element.css('display');
                function hideElement() {
                    element.css('display', 'none');
                }
                scope.$on('loader_show', function() {
                    $log.debug('receive broadcast to show loader');

                    element.css('display', shownType);
                });

                scope.$on('loader_hide', function() {
                    $log.debug('receive broadcast to hide loader');

                    hideElement();
                });

                hideElement();
            }
        };

    });
})();
