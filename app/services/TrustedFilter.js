(function() {
'use strict';

/**
 * @ngdoc filter
 * @name nanodesuApp.services:TrustedFilter
 *
 * @description
 * filter that make sure print HTML tag on angular HTML binding
 */
angular.module('nanodesuApp')
    .filter('trusted', function($sce) {
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    });
})();
