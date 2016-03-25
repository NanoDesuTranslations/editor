'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:service:SeriesService
 * @description
 * # SeriesService
 * Service for page of the nanodesuApp
 */

 angular.module('nanodesuApp')
    .factory('SeriesService', function($resource,$cookies){
        
        return $resource('series/:id',null,{
            get:{
                headers:{
                    'Authorization': auth
                }
            }
        });
        
        function auth(){
            var token = $cookies.get('auth');
            return token;
        }
    });
