(function() {

/**
 * @ngdoc interceptors
 * @name nanodesuApp.service:NdInterceptor
 *
 * @description
 * intercept any $http request and response
 */
angular.module('nanodesuApp')
    .factory('ndInterceptor', function($log) {

        var token = localStorage.getItem('token');

        var requestInterceptor = {
            request: function(config) {
                $log.debug('request interceptor');

                config.headers['Authorization'] = token;
                return config;
            },
            response: function(response) {
                $log.debug('response interceptor' + response);

                return response;
            },
            responseError: function(response) {
                // TODO: perform error message by checking the response code.
                $log.debug('responseError interceptor' + response);
                return response;
            }
        };

        return requestInterceptor;
    });
})();
