(function() {
'use strict';

/**
 * @ngdoc service
 * @name nanodesuApp.service:PageService
 *
 * @description
 * Service for Page
 *
 */
angular.module('nanodesuApp')
    .service('PageService', function($log, alertify, AuthService){

        /**
         * @ngdoc method
         * @name init
         * @methodOf nanodesuApp.service:PageService
         * @description
         * initial method to create list of series based on user permissions
         *
         * @param {Object} object from pages endpoint
         * @param {string} seriesId
         * @return {array} list of object consist series id and series name
         */
        this.init = function(param, seriesId){
            $log.debug('PageService: decided to show a list of series or pages based on pages endpoint');

            var result = '';
            if(seriesId){
                $log.debug('Create Page List');

                result = pageInit(param, seriesId);
            } else {
                $log.debug('Create Series List');

                result = seriesInit(param.series);
            }
            return result;
        };

        /**
         * @ngdoc method
         * @name getUserPermissions
         * @methodOf nanodesuApp.service:PageService
         * @description
         * Check user permission for editing the pages
         *
         * @param {string} seriesId
         * @return {boolean}
         */
        this.getUserPermissions = function(seriesId){
            $log.debug('PageService: check is the user have the privilege or if it is a admin');

            if(inArray(getEditPermissions(), seriesId) || AuthService.isAdmin()){
                return true;
            }
            return false;
        };

        /**
         * @ngdoc method
         * @name getSeriesHierarchy
         * @methodOf nanodesuApp.service:PageService
         * @description
         * Return list of object that consist of 
         * series hierarchy
         *
         * @param {Object} single series object
         * @param {string} seriesId
         * @return {array} list of object that consist
         * series hierarchy
         */
        this.getSeriesHierarchy = function(series, seriesId){
            $log.debug('PageService: getHierarchy function');
            var temp = getSeriesData(series, seriesId);
            var result = [];
            $log.debug(temp);
            var seriesHierarchy = getSeriesHierarchy(temp);
            $log.debug(seriesHierarchy);
            angular.forEach(
                seriesHierarchy,
                function(data){
                    var param = {
                        'label': data,
                        'value': null
                    };
                    this.push(param);
                },
                result
            );
            return result;
        };

        /**
         * @ngdoc method
         * @name getExistingHierarchy
         * @methodOf nanodesuApp.service:PageService
         * @description
         * Return list of object that consist of 
         * series hierarchy and the value
         *
         * @param {Object} object from /pages/:id endpoint
         * @return {array} list of object that consist
         * series hierarchy and the value
         */
        this.getExistingHierarchy = function(param){
            $log.debug('PageService: populate hierarchy from series');

            var page = param.page;
            var series = param.series;
            var seriesHierarchy = series[0].config.hierarchy;
            var result = [];

            angular.forEach(
                seriesHierarchy,
                function(param){
                    var hierarchy = {
                        'label': param,
                        'value': page.meta[param] ? page.meta[param] : null
                    };
                    this.push(hierarchy);
                },
                result
            );

            return result;
        };

        /**
         * @ngdoc method
         * @name getSeriesNameAndId
         * @methodOf nanodesuApp.service:PageService
         * @description
         * Return Series Name and Id
         *
         * @param {Object} Object Series from /pages endpoint
         * @param {string} seriesId
         * @return {Object} consist series name and id
         */
        this.getSeriesNameAndId = function(param, seriesId){
            $log.debug('PageService: return series name and id');

            var result = {};
            result.name = param[seriesId].name;
            result.id = seriesId;

            return result;
        };

        /**
         * @ngdoc method
         * @name seriesInit
         * @methodOf nanodesuApp.service:PageService
         * @description
         * create list of series object based on users view
         *
         * @param {Object} series object from pages endpoint
         * @return {array} list of series object that not deleted
         */
        function seriesInit(param){
            $log.debug('PageService: populate series based on /pages endpoint');

            var data = param;
            var tempResult = [];

            angular.forEach(
                data,
                function(param){
                    var series = {};
                    series.name = param.name;
                    series.id = param.id;
                    series.deleted = param.config.deleted;
                    series.status = param.config.status;
                    series.created = param.config.created;
                    series.updated = param.config.updated;
                    this.push(series);
                },
                tempResult
            );
            var result = removeDeletedSeries(tempResult);

            return result;
        }

        /**
         * @ngdoc method
         * @name pageInit
         * @methodOf nanodesuApp.service:PageService
         * @description
         * create list of page based on users and
         * add new field for editable or not from
         * edit permissions and remove deleted Page.
         * This method just add those two field, the
         * object is handled by controller
         *
         * @param {array} array object from page
         * @param {string} seriesId
         * @return {array} list of new object that
         * consist of not deleted pages
         */
        function pageInit(param, id){
            $log.debug('PageService: pageInit function');
            $log.debug(param);
            var data = param;
            var result = [];
            angular.forEach(
                data,
                function(param){
                    param.isGranted = false;
                    if(inArray(getEditPermissions(), param.series) || AuthService.isAdmin()){
                        param.isGranted = true;
                    }
                    this.push(param);
                },
                result
            );
            $log.debug(removeDeletedPage(result));
            return removeDeletedPage(result);
        }

        /**
         * @ngdoc method
         * @name getViewPermissions
         * @methodOf nanodesuApp.service:PageService
         * @description
         * Since localStorage store view permissions as an array
         * we need to convert this into array using split by comma (,)
         *
         * @return {array} view permissions
         */
        function getViewPermissions(){
            $log.debug('PageService: getViewPermissions function');
            return AuthService.getView().split(','); // since in localStorage just store it as plain String
        }

        /**
         * @ngdoc method
         * @name getEditPermissions
         * @methodOf nanodesuApp.service:PageService
         * @description
         * Since localStorage store edit permissions as an array
         * we need to convert this into array using split by comma (,)
         *
         * @return {array} view permissions
         */
        function getEditPermissions(){
            $log.debug('PageService: check if the user have privilege on the series');
            
            return AuthService.getEdit().split(','); // since in localStorage just store it as plain String
        }

        /**
         * @ngdoc method
         * @name removeDeletedSeries
         * @methodOf nanodesuApp.service:PageService
         * @description
         * compile list of series object just consist not deleted
         * series
         *
         * @param {array} list of series object
         * @return {array} list of series object that not deleted
         */
        function removeDeletedSeries(series){
            $log.debug('PageService: remove series with flag deleted');

            var data = series;
            var result = [];
            angular.forEach(
                data,
                function(param){
                    if(!param.deleted){
                        this.push(param);
                    }
                },
                result
            );

            return result;
        }

        /**
         * @ngdoc method
         * @name removeDeletedPage
         * @methodOf nanodesuApp.service:PageService
         * @description
         * compile list of page object just consist not deleted
         * series
         *
         * @param {array} list of page object
         * @return {array} list of page object that not deleted
         */
        function removeDeletedPage(page){
            $log.debug('PageService: remove pages with flag deleted');

            var data = page;
            var result = [];

            angular.forEach(
                data,
                function(param){
                    if(!param.meta.deleted){
                        this.push(param);
                    }
                },
                result
            );

            return result;
        }

        /**
         * @ngdoc method
         * @name getSeriesData
         * @methodOf nanodesuApp.service:PageService
         * @description
         * get series object by id from /pages endpoint
         *
         * @param {Object} Object from /pages
         * @param {string} seriesId
         * @return {Object} single object of series
         */
        function getSeriesData(param, id){
            $log.debug('PageService: getSeriesData function');
            $log.debug(id);
            var result = {};
            angular.forEach(
                param,
                function(key, value){
                    $log.debug(value+' '+id);
                    if(value === id){
                        $log.debug('match');
                        result = key;
                    }
                }
            );
            return result;
        }

        /**
         * @ngdoc method
         * @name getSeriesHierarchy
         * @methodOf nanodesuApp.service:PageService
         * @description
         * get hierarchy from series config
         *
         * @param {Object} series Object from /pages
         * @return {array} list of hierarchy label from series config
         */
        function getSeriesHierarchy(param){
            $log.debug('PageService: get series hierarchy from series on /pages endpoint');

            var result = param.config.hierarchy;
            return result;
        }

        /**
         * @ngdoc method
         * @name inArray
         * @methodOf nanodesuApp.service:PageService
         * @description
         * Private function to check if a value is consist on an array
         *
         * @param {array} container
         * @param {string} the value that need to check
         * @return {boolean} true/false
         */
        function inArray(array, target){
            $log.debug('PageService: inArray function');
            for(var i=0; i<array.length; i++){
                if(array[i] === target){
                    return true;
                }
            }
            return false;
        }
    });
})();
