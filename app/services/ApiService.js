(function() {
'use strict';

/**
 * @ngdoc controller
 * @name nanodesuApp.service:ApiService
 * 
 * @description
 * Service for calling API endpoint
 */
angular.module('nanodesuApp')
    .factory('ApiService', function($log, $resource){
        var uri = null;

        var ApiService = {};

        ApiService.setUrl = setUrl;
        ApiService.http = http;

        return ApiService;

        /**
        * @ngdoc method
        * @name authentication
        * @methodOf nanodesuApp.service:ApiService
        * @description
        * Get token that stored in localStorage for credentials
        * in headers authorization when call api
        *
        * @returns {string} The value of token
        */ 
        function authentication() {
            var token = localStorage.getItem('token');
            return token;
        }

        /**
         * @ngdoc method
         * @name setUrl
         * @methodOf nanodesuApp.service:ApiService
         * @description 
         * Set value for variable url for API endpoint
         *
         * @param {string} url endpoint
         */
        function setUrl(url) {
            uri = url;
        }

        /**
         * @ngdoc method
         * @name http
         * @methodOf nanodesuApp.service:ApiService
         * @description 
         * create object from $resource
         *
         * @return {Object} $resource Object
         */
        function http() {
            $log.debug('ApiService:http start');
            return $resource(uri+'/:id', null, {
                query: {
                    headers: {
                        'Authorization': authentication
                    }
                },
                get: {
                    headers: {
                        'Authorization': authentication
                    }
                },
                save: {
                    method: 'POST',
                    headers: {
                        'Authorization': authentication
                    }
                },
                update: {
                    method: 'PUT',
                    headers: {
                        'Authorization': authentication
                    }
                },
                delete: {
                    method: 'DELETE',
                    headers: {
                        'Authorization': authentication
                    }
                }
            });
        }

    });
})();
