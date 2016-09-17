'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:controller:BlogCtrl
 * @description
 * # BlogCtrl
 * Controller of the nanodesuApp
 */

angular.module('nanodesuApp')
    .controller('BlogCtrl', function ($scope, $routeParams, alertify, PageService) {
        var seriesId = $routeParams.idSeries 
        $scope.seriesId = seriesId;
        
        PageService.query(function(success){
            var data = success.pages;
            $scope.blogs = [];

            angular.forEach(data, function(param) {
                var deleted = param.meta.deleted;
                var blog = param.meta.blog;

                if(deleted != 1 && typeof blog === 'object'){
                    this.push(param);
                }
            }, $scope.blogs);

            }, function(error){
            console.log('Error!');
        });

        $scope.delete = function (idBlog) {
            alertify.confirm("are you sure?", function(){
                PageService.get({'id': idBlog}, function(success){
                    var deleted = 1;
                    var blog = success.page;
                    blog.meta.deleted = deleted;

                    PageService.update({id: idBlog}, blog, function(success){
                        console.log("Success Delete Blog");
                    }, function(error){
                        console.log("Error! "+error);
                    });
                }, function(error){
                
                });
            }, function(){
                // user click cancel
            });
        } 
    });
