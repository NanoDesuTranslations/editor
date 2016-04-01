'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:controller:PageCtrl
 * @description
 * # PageCtrl
 * Controller of the nanodesuApp
 */

angular.module('nanodesuApp')
    .controller('PageCtrl', function($scope, PageService, SeriesService, $location, $route){
        $scope.show = false;
        
        $scope.series = SeriesService.query(function(success){
                //console.log(success);
            }, function(error){
                //console.log(error);
            });
        
        //query json data from api
        PageService.query(function(success){
            $scope.page = success.pages;
            //console.log(success)
        }, function(error){
            //console.log(error)
        });

        /**
        * Make a custom URL
        * @param {int} arg1 id Series
        * @param {int} arg2 id Page
        * @return location path
        */
        $scope.redirect = function(idSeries, idPage){
            var path = "/page";
            if(idPage != null){
                path = "page/"+idSeries+"/edit/"+idPage;
            }else if(idPage == null){
                path = "page/"+idSeries+"/add";
            }
            //console.log(path)
            $location.path(path);
        }
        
        /**
        * This function is to close modal pages after click button
        */
        $scope.refresh = function(){
            //$scope.series = null;
            $route.reload();
        }
        
        $scope.update = function(){
            $scope.show = true;
        }
        
        /**
        * filter pages by id Series
        */
        $scope.pages = function(param){
            //console.log(param)
            $scope.idSeries = param;
        }
        //$scope.page = PageService.get_page('nano').get({'id': '4'});
        
        $scope.delete = function(idPage){
            PageService.delete({id: idPage}, function(success){
                console.log('success')
            }, function(error){
                console.log(error)
            });
        }
   }); 
