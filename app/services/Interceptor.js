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
                    if(response.config.url === '/user/login') {
                        $rootScope.$broadcast('login_success');
                    } else if(response.config.url === '/build') {
                        $rootScope.$broadcast('preview');
                    } else if(response.config.url === '/build/deploy') {
                        $rootScope.$broadcast('deploy');
                    } else if(response.config.method === 'POST') {
                        $rootScope.$broadcast('created');
                    } else if(response.config.method === 'PUT') {
                        $rootScope.$broadcast('updated');
                    }
                }

                return response;
            },
            responseError: function(response) {
                $log.debug('responseError interceptor');

                if(response.status === 400) {
                    if(response.config.url === '/user/login') {
                        $rootScope.$broadcast('login_failed');
                    } else {
                        $rootScope.$broadcast('error');
                    }
                }
                
                if((--loadings) === 0) {
                    $rootScope.$broadcast('loader_hide');
                }
                
                return $q.reject(response);
            }
        };

        return requestInterceptor;
    });
})();
