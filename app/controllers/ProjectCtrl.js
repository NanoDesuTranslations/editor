(function(){
'use strict';

/**
 * @ngdoc controller
 * @name nanodesuApp.controller:ProjectCtrl
 * @description
 * Controller for Translations Project which is call /series
 */
angular.module('nanodesuApp')
    .controller('ProjectCtrl', function($log, $scope, $rootScope, alertify, SeriesResources, SeriesService){

        SeriesResources.query(function(success) {
            $scope.projects = SeriesService.removeDeleted(success);
        }, function(error) {});

        $rootScope.$on('refreshSeries', function() {
            SeriesResources.query(function(success) {
                $scope.projects = SeriesService.removeDeleted(success);
            }, function(error) {});
        });

        $scope.delete = function(seriesId){
            alertify.confirm(
                'Are You Sure?', 
                function(){

                    var deleted = true;

                    SeriesResources.get({id: seriesId}, function(success) {

                        var series = success;

                        series.config.deleted = deleted;
                        series.$update();

                        if(series.$resolved) {
                            $rootScope.$broadcast('refreshSeries');
                        }
                    }, function(error) {});

                },
                function(){
                    $log.debug('Cancel Button was choosen');
                }
            );
        };
    });
})();
 
