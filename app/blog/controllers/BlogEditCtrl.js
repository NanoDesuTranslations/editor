'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:controller:BlogEditCtrl
 * @description
 * # BlogEditCtrl
 * Controller of the nanodesuApp
 */

angular.module('nanodesuApp')
    .controller('BlogEditCtrl', function ($log, $location, $scope, $routeParams, alertify, AuthService, PageService) {
        // TODO: Since this is a must in every controller need better way to avoid this
        $scope.loader = false; 
        var simpleMDE = new SimpleMDE(document.getElementById("content"));
        var seriesId = $routeParams.idSeries;
        var blogId = $routeParams.idBlog;
        $scope.blog = {};
        $scope.meta = {}; 

        PageService.get({'id': blogId}, function(success){
            $log.debug("start retrieve data by id "+blogId);
            var data = success.page;
            var meta = data.meta;
            var status = meta.status;

            $scope.meta = meta;
            $scope.meta.published = status.toString(); // need convert int to string for select option html
            $scope.blog = meta.blog;
            simpleMDE.value(data.content);

        }, function(error){
            // TODO: give error message properly into user
        });

        $scope.editBlog = function(){
            $scope.loader = true; 
            $log.debug("edit function");
            var data = {};
            var meta = {};

            $scope.meta.author = AuthService.userName();
            meta.blog = $scope.meta.blog; 
            meta.created = $scope.meta.created;
            meta.status = $nd.string2Int0($scope.meta.published);
            meta.title = $scope.meta.title;
            meta.updated = $nd.createEpochTime();

            data.content = simpleMDE.value();
            data.meta = meta;
            $log.debug(data); 
            PageService.update({id: blogId}, data, function(success){
                $scope.loader = false; 
                alertify.success("Success Edit Post");
                $log.debug("success edit data by id "+blogId);
            }, function(error){
                alertify.error("Error! Please Contact Admin");
            });
        }
    });

