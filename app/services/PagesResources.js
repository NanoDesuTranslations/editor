(function() {
'use strict'

/**
 * @ngdoc resources
 * @name nanodesuApp.service:PagesResources
 *
 * @description
 * handle user resources
 */
angular.module('nanodesuApp')
    .factory('PagesResources', function($resource) {
        return $resource('/pages/:id', {id: '@id'}, {
            'update': {method: 'PUT'}
        });
    });
})();
