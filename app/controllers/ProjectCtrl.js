(function(){
'use strict';

/**
 * @ngdoc controller
 * @name nanodesuApp.controller:ProjectCtrl
 * @description
 * Controller for Translations Project which is call /series
 */
angular.module('nanodesuApp')
    .controller('ProjectCtrl', function($log, $scope, alertify, SeriesResources, SeriesService){

        SeriesResources.query(function(success) {
            $scope.projects = SeriesService.removeDeleted(success);
        }, function(error) {});

        $scope.delete = function(seriesId){
            alertify.confirm(
                'Are You Sure?', 
                function(){
                    SeriesService.delete(seriesId);
                },
                function(){
                    $log.debug('Cancel Button was choosen');
                }
            );
        };
    });
})();
 
