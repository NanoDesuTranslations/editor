'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:service:SeriesService
 * @description
 * # SeriesService
 * Service for page of the nanodesuApp
 */

 angular.module('nanodesuApp')
    .factory('SeriesService', function($resource) {
        
        //use query parameter ({}) to avoid Error [$resource:badcfg]
        return $resource('series/:id',{},{
            query: {
                isArray: true,
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
            var token = localStorage.getItem('token');
            return token;
        }
    });
