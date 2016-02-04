'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:controller:PageCtrl
 * @description
 * # PageCtrl
 * Controller of the nanodesuApp
 */

angular.module('nanodesuApp')
    .controller('PageCtrl', function($scope, PageService){
        var auth = 'nano';
        
        //query json data
        $scope.data = PageService.query_all(auth).query();
        
        //filter for pages by id series
        $scope.seriesFilter = function(param){
            $scope.idSeries = param;
        }
        //$scope.page = PageService.get_page('nano').get({'id': '4'});
   }); 
