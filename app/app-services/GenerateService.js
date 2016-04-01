'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:service:GenerateService
 * @description
 * # GenerateService
 * Service for page of the nanodesuApp
 */

angular.module('nanodesuApp')
    .factory('GenerateService', function($resource, $cookies){
        return $resource('build', null, {
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
        });    

        function auth(){
            var token = $cookies.get('token');
            return token;
        }
    });
