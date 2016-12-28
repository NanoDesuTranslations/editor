(function(){
'use strict';

/**
 * @ngdoc controller
 * @name nanodesuApp.controller:ProjectCtrl
 * @description
 * Controller for Translations Project which is call /series
 */
angular.module('nanodesuApp')
    .controller('ProjectCtrl', function($log, $scope, alertify, ApiService, SeriesService){
        ApiService.setUrl($nd.series);

        ApiService.http().query(
            function(success){
                $log.debug('Success Retrieve Series Data');
                $log.debug(success);
                $scope.projects = success;
            },
            function(error){
                $log.debug('Error! '+error);
                alertify.error('Error! Please Contact Admin');
            }
        );

        $scope.delete = function(seriesId){
            alertify.confirm(
                'Are You Sure?', 
                function(){
                    $log.debug('Yes Button was choosen');
                    SeriesService.delete(seriesId);
                },
                function(){
                    $log.debug('Cancel Button was choosen');
                }
            );
        };
    });
})();
 
