'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:controller:BlogEditCtrl
 * @description
 * # BlogEditCtrl
 * Controller of the nanodesuApp
 */

angular.module('nanodesuApp')
    .controller('BlogEditCtrl', function ($scope, $routeParams, AuthService, PageService) {
        var simpleMDE = new SimpleMDE(document.getElementById("content"));
        var seriesId = $routeParams.idSeries;
        var blogId = $routeParams.idBlog;
        $scope.blog = {};
        $scope.meta = {}; 

        PageService.get({'id': blogId}, function(success){
            var data = success.page;
            var meta = data.meta;

            $scope.meta = meta;
            $scope.meta.published = meta.status;
            $scope.blog = meta.blog;
            simpleMDE.value(data.content);

        }, function(error){
            console.log("error");
        });

        $scope.editBlog = function(){
            var data = {};
            var meta = {};

            meta.blog = $scope.meta.blog; 
            meta.created = $scope.meta.created;
            meta.status = $scope.meta.published;
            meta.title = $scope.meta.title;
            meta.updated = $nd.createEpochTime();

            data.content = simpleMDE.value();
            data.meta = meta;
            
            PageService.update({id: blogId}, data, function(success){
                console.log("success edit data");
            }, function(error){
                console.log("error edit data");
            });
        }
    });

