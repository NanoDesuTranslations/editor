'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:controller:BlogAddCtrl
 * @description
 * # BlogAddCtrl
 * Controller of the nanodesuApp
 */

angular.module('nanodesuApp')
    .controller('BlogAddCtrl', function ($log, $location, $scope, $routeParams, alertify, AuthService, PageService) {
        // TODO: Since this is a must in every controller need better way to avoid this
        $scope.loader = false; 
        var simpleMDE = new SimpleMDE(document.getElementById("content"));
        var seriesId = $routeParams.idSeries;
        $scope.blog = {};
        $scope.meta = {};
        // TODO: @yarn said to make null blog_id field for the future
        //$scope.blog.blog_id = ''; 
        $scope.blog.author = AuthService.userName();
        $scope.blog.published_date = 0;
        // it's needed to avoid when pinned and published field is empty
        $scope.blog.pinned = 0;
        $scope.meta.published = '5';

        function createRequestData(){
            $log.debug("creating object data");
            var request = {};
            var meta = {};
            var published = $scope.meta.published;
            var publishedDate = $nd.createEpochTime();

            if(published === '1'){
                $scope.blog.published_date = publishedDate;
            }

            meta.blog = $scope.blog;
            meta.title = $scope.meta.title;
            meta.status = $nd.string2Int0(published);
            meta.created = $nd.createEpochTime();
            meta.updated = 0;
            meta.deleted = false;
            
            request.meta = meta;
            request.series = seriesId;
            request.content = simpleMDE.value();
            
            return request;
        }

        $scope.saveBlog = function(){
            $scope.loader = true; 
            var data = createRequestData();

            PageService.save(data, function(status){
                $scope.loader = false; 
                alertify.success("Succes Save Post");
                $log.debug("success save data");
                $location.path("/blog/"+seriesId);
            }, function(error){
                alertify.error("Error! Please Contact Admin");
            });
        }
    });

