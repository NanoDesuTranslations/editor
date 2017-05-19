(function(){
'use strict';

/**
 * @ngdoc controller
 * @name nanodesuApp.controller:ProjectListCtrl
 * @description
 * Controller for List All Project by Users
 */
angular.module('nanodesuApp')
    .controller('ProjectListCtrl', function($log, $scope, PagesResources, PageService){
        $scope.series = [];

        PagesResources.get(function(success) {
            $scope.series = PageService.init(success);
        }, function(error) {});

    });
})(); 
