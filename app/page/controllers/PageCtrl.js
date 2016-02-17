'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:controller:PageCtrl
 * @description
 * # PageCtrl
 * Controller of the nanodesuApp
 */

angular.module('nanodesuApp')
    .controller('PageCtrl', function($scope, PageService, $location){
        var auth = 'nano';
        
        //query json data from api
        $scope.data = PageService.query_all(auth).query(function(success){
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
            $scope.closeModal();
        }
        
        /**
        * This function is to close modal pages after click button
        */
        $scope.closeModal = function(){
            $('#pages').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        }
        
        
        /**
        * filter pages by id Series
        */
        $scope.pages = function(param){
            //console.log(param)
            $scope.idSeries = param;
        }
        //$scope.page = PageService.get_page('nano').get({'id': '4'});
        
        $scope.delete_data = function(idPage){
            PageService.delete_data(auth).delete({id: idPage}, function(success){
                console.log('success')
            }, function(error){
                console.log(error)
            });
        }
   }); 
