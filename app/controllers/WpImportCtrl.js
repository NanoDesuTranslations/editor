(function(){
'use strict';

/**
 * @ngdoc controller
 * @name nanodesuApp.controller:WpImportCtrl
 * @description
 * Controller for Main Page
 */
angular.module('nanodesuApp')
    .controller('WpImportCtrl', function($log, $scope, SeriesResources, WpResources, SeriesService){

        SeriesResources.query(function(success) {
            $scope.series = SeriesService.removeDeleted(success);
            $log.debug($scope.series);
        }, function(error) {});

        $scope.import = function() {
            WpResources.get({'series': $scope.project.id, 'site': $scope.site});
        };

    });
})();
