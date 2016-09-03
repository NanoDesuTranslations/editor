'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:service:PageService
 * @description
 * # PageService
 * Service for page of the nanodesuApp
 */

angular.module('nanodesuApp')
    .factory('PageService', function ($resource){
        //var site_url = 'http://127.0.0.1:3000/';

        return $resource('pages/:id',null,{
            query: {
                headers:{
                    'Authorization': auth
                }
            },
            get: {
                headers:{
                    'Authorization': auth
                }
            }, 
            save: {
                method: "POST",
                headers:{
                    'Authorization': auth
                }
            }, 
            update: {
                method: "PUT",
                headers:{
                    'Authorization': auth
                }
            },
            delete: {
                method: "DELETE",
                headers:{
                    'Authorization': auth
                }
            }
        });
        
        function auth(){
            var token = localStorage.getItem('token');
            return token;
        }
    });
