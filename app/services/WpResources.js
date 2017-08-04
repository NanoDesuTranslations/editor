(function() {
'use strict';

/**
 * @ngdoc resources
 * @name nanodesuApp.service:WpResources
 *
 * @description
 * handle user resources
 */
angular.module('nanodesuApp')
    .factory('WpResources', function($resource) {
        return $resource('/wordpress/:series/:site', {series: '@series', site: '@site'}, {
            'update': {method: 'PUT'} 
        });
    });
})();

