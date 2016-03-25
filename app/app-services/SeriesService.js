'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:service:SeriesService
 * @description
 * # SeriesService
 * Service for page of the nanodesuApp
 */

 angular.module('nanodesuApp')
    .factory('SeriesService', function($resource,$cookies) {
        
        return $resource('series/:id',null,{
            query: {
                headers: {
                    'Authorization': auth
                }
            },
            get: {
                headers: {
                    'Authorization': auth
                }
            },
            save: {
                method: "POST",
                headers: {
                    'Authorization': auth
                }
            },
            update: {
                method: "PUT",
                headers: {
                    'Authorization': auth
                }
            },
            delete: {
                method: "DELETE",
                headers: {
                    'Authorization': auth
                }
            },
        });
        
        function auth() {
            var token = $cookies.get('auth');
            return token;
        }
    });
