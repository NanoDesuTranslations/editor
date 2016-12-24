(function(){
'use strict';

/**
 * @ngdoc controller
 * @name nanodesuApp.controller:BlogCtrl
 * @description
 * Controller for Blog Posts
 */
angular.module('nanodesuApp')
    .controller('BlogCtrl', function($log, $scope, $routeParams, alertify, ApiService, PageService){
        var uri = '/pages';
        var seriesId = $routeParams.id;
        $scope.blogs = [];

        ApiService.setUrl(uri);
        ApiService.http().get(
            function(success){
                $log.debug(success);
                var data = success.pages;
                $scope.isGranted = PageService.getUserPermissions(seriesId);
                $scope.series = PageService.getSeriesNameAndId(success.series, seriesId); 
                $scope.blogs = getBlogs(data);
            },
            function(error){
                $log.debug(error);
                alertify.error('Error! Please Contact Admin');
            }
        );

        $scope.delete = function(pageId){
            $log.debug('BlogCtrl: delete function');
            $log.debug(pageId);
            alertify.confirm(
                'Are You Sure?',
                function(){
                    $log.debug('Yes Button was choosen');
                    PageService.delete(pageId);
                },
                function(){
                    $log.debug('Cancel Button was choosen');
                }
            );
        };
        
        function getBlogs(param){
            $log.debug('BlogCtrl: getBlogs function');
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
            $log.debug(result);
            return result;
        }
    });
})(); 
