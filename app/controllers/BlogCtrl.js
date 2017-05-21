(function(){
'use strict';

/**
 * @ngdoc controller
 * @name nanodesuApp.controller:BlogCtrl
 * @description
 * Controller for Blog Posts
 */
angular.module('nanodesuApp')
    .controller('BlogCtrl', function($log, $scope, $rootScope, $routeParams, alertify, PagesResources, PageService){
        var seriesId = $routeParams.id;
        $scope.blogs = [];

        PagesResources.get(function(success) {
            var data = success.pages;
            $scope.isGranted = PageService.getUserPermissions(seriesId);
            $scope.series = PageService.getSeriesNameAndId(success.series, seriesId); 
            $scope.blogs = getBlogs(data);
        }, function(error) {});

        $rootScope.$on('refreshBlog', function() {
            PagesResources.get(function(success) {
                var data = success.pages;
                $scope.isGranted = PageService.getUserPermissions(seriesId);
                $scope.series = PageService.getSeriesNameAndId(success.series, seriesId); 
                $scope.blogs = getBlogs(data);
            }, function(error) {});
        });

        $scope.delete = function(pageId){
            $log.debug('BlogCtrl: delete function');

            alertify.confirm(
                'Are You Sure?',
                function(){
                    $log.debug('Yes Button was choosen');

                    PagesResources.get({id: pageId}, function(success) {
                        var page = success.page;
                        page.meta.deleted = true;

                        PagesResources.update({id: pageId}, page, function(success) {
                            $rootScope.$broadcast('refreshBlog');
                        }, function(error) {});
                    });
                },
                function(){
                    $log.debug('Cancel Button was choosen');
                }
            );
        };
        
        function getBlogs(param){
            $log.debug('BlogCtrl: populate data so it will be not have deleted flag, part of series by series id and type of blog');

            var result = [];
            angular.forEach(
                param,
                function(data){
                    var deleted = data.meta.deleted;
                    var blog = data.meta.blog;

                    if(!deleted && typeof blog === 'object' && data.series === seriesId){
                        this.push(data);
                    }
                },
                result
            );

            return result;
        }
    });
})(); 
