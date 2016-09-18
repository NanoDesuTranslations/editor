'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:controller:BlogCtrl
 * @description
 * # BlogCtrl
 * Controller of the nanodesuApp
 */

angular.module('nanodesuApp')
    .controller('BlogCtrl', function ($log, $route, $scope, $routeParams, alertify, PageService) {
        var seriesId = $routeParams.idSeries 
        $scope.seriesId = seriesId;
        
        PageService.query(function(success){
            $log.debug("start retreive blog from pages");
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
            // TODO: give error message into user properly
            //$log.error("Error "+error.status+"! "+error.statusText);
        });

        $scope.delete = function (idBlog) {
            alertify.confirm("are you sure?", function(){
                $log.debug("user click yes button");

                PageService.get({'id': idBlog}, function(success){
                    $log.debug("retrieve data by id "+idBlog);
                    var deleted = 1;
                    var blog = success.page;
                    blog.meta.deleted = deleted;

                    PageService.update({id: idBlog}, blog, function(success){
                        // TODO: give success message into user properly
                        $log.debug("success delete data by id "+idBlog);
                        $route.reload();
                    }, function(error){
                        // TODO: give error message into user properly
                    });
                }, function(error){
                    // TODO: give error message into user properly
                });
            }, function(){
                // user click cancel
                $log.debug("user click cancel button");
            });
        } 
    });
