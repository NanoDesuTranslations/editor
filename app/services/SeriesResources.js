(function() {
'use strict';

/**
 * @ngdoc resources
 * @name nanodesuApp.service:SeriesResources
 *
 * @description
 * handle user resources
 */
angular.module('nanodesuApp')
    .factory('SeriesResources', function($resource) {
        return $resource('/series/:id', {id: '@id'}, {
            'update': {method: 'PUT'} 
        });
    });
})();
