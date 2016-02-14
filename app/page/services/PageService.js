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
       
        return {
            query_all: function(param){
                return $resource('pages/:id',null,{
                    query: {
                        headers:{
                            'Authorization': param,
                        }
                    }
                })
            },
            get_all: function(param){
                return $resource('pages/:id',null,{
                    get: {
                        headers: {
                            'Authorization': param,
                        }
                    }    
                })
            },
            save_data: function(param){
                return $resource('pages/:id', null, {
                    save: {
                        method: "POST",
                        headers: {
                            'Authorization': param,
                        }
                    }
                });
            },
        }
    });
