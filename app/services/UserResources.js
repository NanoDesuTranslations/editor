(function() {
'use strict'

/**
 * @ngdoc resources
 * @name nanodesuApp.service:UserResources
 *
 * @description
 * handle user resources
 */
angular.module('nanodesuApp')
    .factory('UserResources', function($resource) {
        return $resource('/admin/users/:username', null, {
            'update': {method: 'PUT'}
        });
    });
})();
