(function(){
'use strict';

/**
 * @ngdoc controller
 * @name nanodesuApp.controller:TranslationCtrl
 * @description
 * Controller for Translations Page
 */
angular.module('nanodesuApp')
    .controller('TranslationCtrl', function($log, $scope, $rootScope, $routeParams, alertify, PagesResources, PageService){
        var seriesId = $routeParams.id;

        PagesResources.get(function(success) {
            var data = init(success);
            $scope.pages = PageService.init(data, seriesId);
            $scope.isGranted = PageService.getUserPermissions(seriesId);
            $scope.series = PageService.getSeriesNameAndId(success.series, seriesId);
        }, function(error) {});

        $rootScope.$on('refreshTranslations', function() {
            PagesResources.get(function(success) {
                var data = init(success);
                $scope.pages = PageService.init(data, seriesId);
                $scope.isGranted = PageService.getUserPermissions(seriesId);
                $scope.series = PageService.getSeriesNameAndId(success.series, seriesId);
            }, function(error) {});
        });

        $scope.delete = function(pageId){
            $log.debug('TranslationCtrl: set flag deleted');
            
            alertify.confirm(
                'Are You Sure?',
                function(){
                    $log.debug('Yes Button was choosen');

                    PagesResources.get({id: pageId}, function(success) {
                        var page = success.page;
                        page.meta.deleted = true;

                        PagesResources.update({id: pageId}, page, function(success) {
                            $rootScope.$broadcast('refreshTranslations');
                        }, function(error) {});
                    });

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
         * exclude blog
         *
         * @param {Object} Object pages and Series from /pages endpoint
         * @return {array} List of new object
         */
        function init(param){
            $log.debug('TranslationCtrl: populate the data based on /pages endpoint and added information from the series');

            var tempResult = [];
            var tempPages = initPages(param.pages);
            var tempSeries = initSeries(param.series);

            angular.forEach(
                tempPages,
                function(data){
                    data.hierarchy = tempSeries.hierarchy;
                    data.seriesName = tempSeries.name;
                    if(data.meta.blog === false) {
                        this.push(data);
                    }
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
            $log.debug('TranslationCtrl: list of pages based on seriesId');

            var result = [];
            angular.forEach(
                param,
                function(data){
                    if(data.series === seriesId){
                        this.push(data);
                    }
                },
                result
            );

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
            $log.debug('TranslationCtrl: populate series data to shown on the table list');

            var result = {};
            angular.forEach(
                param,
                function(key, value){
                    if(value === seriesId){
                        result.name = key.name;
                        result.hierarchy = key.config.hierarchy;
                    }
                },
                result
            );

            return result;
        }

    });
})();
