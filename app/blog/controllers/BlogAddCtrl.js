'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:controller:BlogAddCtrl
 * @description
 * # BlogAddCtrl
 * Controller of the nanodesuApp
 */

angular.module('nanodesuApp')
    .controller('BlogAddCtrl', function ($scope, $routeParams, AuthService, PageService) {
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
        $scope.meta.published = '0';

        function createRequestData(){
            var request = {};
            var meta = {};
            var published = $scope.meta.published;
            var publishedDate = $nd.createEpochTime();

            if(published === '1'){
                $scope.blog.published_date = publishedDate;
            }

            meta.blog = $scope.blog;
            meta.title = $scope.meta.title;
            meta.status = published;
            meta.created = $nd.createEpochTime();
            meta.updated = 0;
            meta.deleted = 0;
            
            request.meta = meta;
            request.series = seriesId;
            request.content = simpleMDE.value();
            
            return request;
        }

        $scope.saveBlog = function(){
            var data = createRequestData();

            PageService.save(data, function(status){
                // TODO: create success message
            }, function(error){
                alert('Error! Please try again');
            });
        }
    });

