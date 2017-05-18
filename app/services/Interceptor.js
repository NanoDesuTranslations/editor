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
    .factory('ndInterceptor', function($q, $log, $rootScope) {

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
                $log.debug('response interceptor');

                if((--loadings) === 0) {
                    $rootScope.$broadcast('loader_hide');
                }

                if(response.status === 200) {
                    if(response.config.method === 'POST') {
                        $rootScope.$broadcast('created');
                    } else if(response.config.method === 'PUT') {
                        $rootScope.$broadcast('updated');
                    }
                }

                return response;
            },
            responseError: function(response) {
                // TODO: perform error message by checking the response code.
                $log.debug('responseError interceptor');
                if(response.status === 401) {
                    $rootScope.$broadcast('unauthorized');
                }
                
                if((--loadings) === 0) {
                    $rootScope.$broadcast('loader_hide');
                }
                $rootScope.$broadcast('error');
                
                return $q.reject(response);
            }
        };

        return requestInterceptor;
    });
})();
