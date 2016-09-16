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
        $scope.blog.author = AuthService.userName();
        // it's needed to avoid when pinned and published field is empty
        $scope.blog.pinned = 0;
        $scope.meta.published = '0';

        function createRequestData(){
            var request = {};
            var meta = {};
            
            meta.blog = $scope.blog;
            meta.title = $scope.meta.title;
            meta.status = $scope.meta.published;
            
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

