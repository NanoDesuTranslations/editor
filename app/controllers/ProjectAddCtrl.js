(function(){
'use strict';

/**
 * @ngdoc controller
 * @name nanodesuApp.controller:ProjectAddCtrl
 * @description
 * Controller for Add new Series or Edit Existing Series
 */
angular.module('nanodesuApp')
    .controller('ProjectAddCtrl', function($log, $scope, $routeParams, SeriesResources, SeriesService){
        var seriesId = $routeParams.id;
        $scope.series = getSeries();
        $scope.level = []; // used in dynamic field for hierarchy

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
        };

        $scope.submit = function(){
            $log.debug('ProjectAddCtrl: submit function');
            
            var series = reformatData($scope.series);
            if(seriesId){
                SeriesResources.update({id: seriesId}, series);
                $scope.series = reverseData(series);
            } else {
                SeriesResources.save(series);
                $scope.series = reverseData(series);
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
            $log.debug('ProjectAddCtrl: get series either is exist or not');

            var series = {};
            if(seriesId){
                $log.debug('id exist');

                SeriesResources.get({id: seriesId}, function(success) {
                    $scope.series = reverseData(success);
                }, function(error) {});

            } else {
                $log.debug('id not exist');

                series = {
                    'name': null,
                    'config': {
                        'created': $nd.createEpochTime(),
                        'updated': null,
                        'status': '5',
                        'hierarchy': [],
                        'deleted': false,
                        'fixed_nav_entries': false
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
            $log.debug('ProjectAddCtrl: reformat data from HTML so API can accept it');
            var data = angular.copy(series);
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
            $log.debug('ProjectAddCtrl: reformat data from API to match with HTML bidning');

            var status = series.config.status;
            var temp = {};

            temp.config = {};
            temp.name = series.name;
            temp.config.created = series.config.created;
            temp.config.updated = series.config.updated;
            temp.config.status = status.toString(); 
            temp.config.deleted = series.config.deleted;
            temp.config.fixed_nav_entries = series.config.fixed_nav_entries;

            $scope.headerUrl = series.config['header-url'];
            reverseHierarchy(series.config.hierarchy);

            return temp;
        }
    });
})();

