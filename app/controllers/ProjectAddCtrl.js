(function(){
'use strict';

/**
 * @ngdoc controller
 * @name nanodesuApp.controller:ProjectAddCtrl
 * @description
 * Controller for Add new Series or Edit Existing Series
 */
angular.module('nanodesuApp')
    .controller('ProjectAddCtrl', function($log, $scope, $routeParams, alertify, ApiService, SeriesService){
        var uri = '/seris';
        var seriesId = $routeParams.id;
        $scope.series = getSeries();
        $scope.level = []; // used in dynamic field for hierarchy

        $log.debug('is id exist: '+$routeParams.id);
        $log.debug(seriesId);
        /**
         * @ngdoc method
         * @name addLevel
         * @methodOf nanodesuApp.controller.ProjectAddCtrl
         * @description
         * add new input field for hierarchy
         */ 
        $scope.addLevel = function(){
            $log.debug('ProjectAddCtrl: addLevel function');
            $scope.level.push({id: $scope.level.length });
        };
    
        /**
         * @ngdoc method
         * @name removeLevel
         * @methodOf nanodesuApp.controller.ProjectAddCtrl
         * @description
         * remove specific input field in hierarchy
         */ 
        $scope.removeLevel = function(id){
            if(id < 0 || id > $scope.level.length){
                return;
            }
            var debug = $scope.level.splice(id, 1);
            $log.debug("Removed element " + id + " from tiers.  " + debug.length + " gone, " + $scope.level.length + " left.");
        };

        $scope.submit = function(){
            $log.debug('ProjectAddCtrl: submit function');
            $log.debug(reformatData($scope.series));
            var series = reformatData($scope.series);
            if(seriesId != null) {
            } else {
                SeriesService.save(series);
            }
        }

        /**
         * @ngdoc method
         * @name getSeries
         * @methodOf nanodesuApp.controller.ProjectAddCtrl
         * @description
         * create series object depend it's new or existing
         * 
         * @param {string} seriesId
         * @return {Object} series
         */
        function getSeries(seriesId){
            var series = {};
            if(seriesId != null){
            } else {
                series = {
                    'name': null,
                    'config': {
                        'created': $nd.createEpochTime(),
                        'updated': 0,
                        'status': '5',
                        'hierarchy': [],
                        'deleted': false
                    }
                };
            }
            return series;
        }

        /**
         * @ngdoc method
         * @name addHierarchy
         * @methodOf nanodesuApp.controller.ProjectAddCtrl
         * @description
         * private function to convert hierarchy from ng-model
         *
         * @return {Array} hierarchy
         */ 
        function addHierarchy(){
            var hierarchy = [];
            for(var i=0; i < $scope.level.length; i++){
                hierarchy.push($scope.level[i].name);
            }
            return hierarchy;
        }

        /**
         * @ngdoc method
         * @name reformatData
         * @methodOf nanodesuApp.controller.ProjectAddCtrl
         * @description
         * private function to clean data from html such as convert string to int
         * addHierarchy and header-url
         *
         * @param {Object} $scope.series
         * @return {Object} series
         */ 
        function reformatData(series){
            var series = series;
            series.config['header-url'] = $scope.headerUrl;
            series.config.hierarchy = addHierarchy();
            series.config.status = $nd.string2Int0(series.config.status);
            return series;
        }

    });
})();
 
