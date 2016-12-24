(function(){
'use strict';

/**
 * @ngdoc controller
 * @name nanodesuApp.controller:TranslationCtrl
 * @description
 * Controller for Translations Page
 */
angular.module('nanodesuApp')
    .controller('TranslationCtrl', function($log, $scope, $routeParams, alertify, ApiService, PageService){
        var uri = '/pages';
        var seriesId = $routeParams.id;
        ApiService.setUrl(uri);
        ApiService.http().get(
            function(success){
                $log.debug(success);
                var data = init(success);
                $log.debug('TranslationCtrl init');
                $log.debug(data);
                $scope.pages = PageService.init(data, seriesId);
                $scope.isGranted = PageService.getUserPermissions(seriesId);
                $scope.series = getSeriesNameAndId(success.series);
                $log.debug($scope.isGranted);
            },
            function(error){
                $log.debug(error);
                alertify.error('Error! Please Contact Admin');
            }
        );

        $scope.delete = function(pageId){
            $log.debug('TranslationCtrl: delete function');
            $log.debug(pageId);
            alertify.confirm(
                'Are You Sure?',
                function(){
                    $log.debug('Yes Button was choosen');
                    PageService.delete(pageId);
                },
                function(){
                    $log.debug('Cancel Button was choosen');
                }
            );
        };
        
        /**
         * @ngdoc method
         * @name init
         * @methodOf nanodesuApp.controller:TranslationCtrl
         * @description
         * Create list of object which is mainly from pages object
         * and add new field hierarchy, id, and name of series
         *
         * @param {Object} Object pages and Series from /pages endpoint
         * @return {array} List of new object
         */
        function init(param){
            $log.debug('TranslationCtrl: init function');
            var tempResult = [];
            var tempPages = initPages(param.pages);
            var tempSeries = initSeries(param.series);
            angular.forEach(
                tempPages,
                function(data){
                    $log.debug('initPages');
                    $log.debug(tempSeries);
                    data.hierarchy = tempSeries.hierarchy;
                    data.seriesName = tempSeries.name;
                    this.push(data);
                },
                tempResult
            );
            return tempResult;
        }

        /**
         * @ngdoc method
         * @name initPages
         * @methodOf nanodesuApp.controller:TranslationCtrl
         * @description
         * create list of object based on seriesId
         *
         * @param {Object} Object pages from /pages endpoint
         * @return {array} List of new object from pages that matches 
         * with seriesId
         */
        
        function initPages(param){
            $log.debug('TranslationCtrl: initPages function');
            $log.debug(param);
            var result = [];
            angular.forEach(
                param,
                function(data){
                    $log.debug(seriesId);
                    if(data.series === seriesId){
                        this.push(data);
                    }
                },
                result
            );
            $log.debug(result);
            return result;
        }

        /**
         * @ngdoc method
         * @name initSeries
         * @methodOf nanodesuApp.controller:TranslationCtrl
         * @description
         * Create new object consist of name and hierarchy
         * from series
         *
         * @param {Object} Object Series from /pages endpoint
         * @return {Object} Object with name and hierarchy field
         */
        function initSeries(param){
            $log.debug('TranslationCtrl: initSeries function');
            $log.debug(param);
            var result = {};
            angular.forEach(
                param,
                function(key, value){
                    $log.debug(key+' '+value);
                    if(value === seriesId){
                        result.name = key.name;
                        result.hierarchy = key.config.hierarchy;
                    }
                },
                result
            );
            $log.debug(result);
            return result;
        }

        /**
         * @ngdoc method
         * @name getSeriesNameAndId
         * @methodOf nanodesuApp.controller:TranslationCtrl
         * @description
         * Return Series Name and Id
         *
         * @param {Object} Object Series from /pages endpoint
         * @return {Object} consist series name and id
         */
        function getSeriesNameAndId(param){
            $log.debug('TranslationCtrl: getSeriesNameAndId function');
            $log.debug(param[seriesId].name);
            var result = {};
            result.name = param[seriesId].name;
            result.id = seriesId;
            return result;
        }
    });
})(); 
