(function(){
'use strict';

/**
 * @ngdoc controller
 * @name nanodesuApp.controller:ProjectListCtrl
 * @description
 * Controller for List All Project by Users
 */
angular.module('nanodesuApp')
    .controller('ProjectListCtrl', function($log, $scope, alertify, ApiService, PageService){
        $scope.series = [];
        ApiService.setUrl($nd.pages);
        ApiService.http().get(
            function(success){
                $log.debug(success);
                $scope.series = PageService.init(success);
            },
            function(error){
                $log.debug(error);
                alertify.error('Error! Please Contact Admin');
            }
        );
    });
})(); 
