'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:service:SeriesService
 * @description
 * # SeriesService
 * Service for page of the nanodesuApp
 */

 angular.module('nanodesuApp')
    .factory('SeriesService', function($resource){
        return{
            get_all: function(param){
                return $resource('series/:id', null, {
                    get: {
                        headers: {
                            'Authorization': param,
                        }
                    }
                })
            }
        }
    });
