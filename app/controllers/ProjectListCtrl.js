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
        var uri = '/pages';
        $scope.series = [];
        ApiService.setUrl(uri);
        ApiService.http().get(
            function(success){
                $log.debug(success);
                $scope.series = PageService.init(success);
            },
            function(error){
                $log.debug('Error Login');
                $log.debug(error);
            }
        );
    });
})(); 
