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
        var uri = '/series';
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
            if(seriesId){
                SeriesService.update(seriesId, series);
            } else {
                SeriesService.save(series);
            }
        };

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
        function getSeries(){
            $log.debug('ProjectAddCtrl: getSeries function');
            var series = {};
            if(seriesId){
                $log.debug('id exist');
                ApiService.setUrl(uri);

                // since using callback I decide to put the value into scope directly
                ApiService.http().get(
                    {'id': seriesId},
                    function(success){
                        $log.debug(success);
                        $scope.series = reverseData(success);
                    },
                    function(error){
                        $log.debug(error);
                        alertify.error('Error! Please Contact Admin');
                    }
                );
            } else {
                $log.debug('id not exist');
                series = {
                    'name': null,
                    'config': {
                        'created': $nd.createEpochTime(),
                        'updated': null,
                        'status': '5',
                        'hierarchy': [],
                        'deleted': false
                    }
                };
            }
            $log.debug('series object from getSeries()');
            $log.debug(series);
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
         * @name reverseHierarchy
         * @methodOf nanodesuApp.controller.ProjectAddCtrl
         * @description
         * private function to convert hierarchy from api into ng-model
         * 
         * @param {Array} hierarchy from API
         * @return {Array} hierarchy
         */
        function reverseHierarchy(param){
            for(var i=0; i<param.length; i++){
                $scope.level.push({id: i, name: param[i]});
            }
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
            var data = series;
            data.config['header-url'] = $scope.headerUrl;
            data.config.hierarchy = addHierarchy();
            data.config.status = $nd.string2Int0(data.config.status);
            return data;
        }

        /**
         * @ngdoc method
         * @name reverseData
         * @methodOf nanodesuApp.controller.ProjectAddCtrl
         * @description
         * private method to reverse data from endpoint into scope
         * to shown in html
         *
         * @param {Object} object from api
         * @return {Object} series
         */
        function reverseData(series){
            $log.debug('ProjectAddCtrl: reverseData function');
            var status = series.config.status;
            var temp = {};
            temp.config = {};
            temp.name = series.name;
            temp.config.created = series.config.created;
            temp.config.updated = series.config.updated;
            temp.config.status = status.toString(); 
            temp.config.deleted = series.config.deleted;

            $scope.headerUrl = series.config['header-url'];
            reverseHierarchy(series.config.hierarchy);

            $log.debug(temp);
            return temp;
        }
    });
})();

