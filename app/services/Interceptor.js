(function() {
'use strict'

/**
 * @ngdoc interceptors
 * @name nanodesuApp.service:NdInterceptor
 *
 * @description
 * intercept any $http request and response
 */
angular.module('nanodesuApp')
    .factory('ndInterceptor', function($log, $rootScope) {

        var loadings = 0;
        var token = localStorage.getItem('token');

        var requestInterceptor = {
            request: function(config) {
                $log.debug('request interceptor');
                
                loadings++;
                $rootScope.$broadcast('loader_show');

                config.headers['Authorization'] = token;
                return config;
            },
            response: function(response) {
                $log.debug('response interceptor' + response);

                if((--loadings) === 0) {
                    $rootScope.$broadcast('loader_hide');
                }

                return response;
            },
            responseError: function(response) {
                // TODO: perform error message by checking the response code.
                $log.debug('responseError interceptor' + response);
                
                $rootScope.$broadcast('loader_hide');
                
                return response;
            }
        };

        return requestInterceptor;
    });
})();
