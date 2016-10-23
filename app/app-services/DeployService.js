'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:service:DeployService
 * @description
 * # GenerateService
 * Service for page of the nanodesuApp
 */

angular.module('nanodesuApp')
    .factory('DeployService', function($resource){
        return $resource('build/deploy', null, {
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
            var token = localStorage.getItem('token');
            return token;
        }
    });
