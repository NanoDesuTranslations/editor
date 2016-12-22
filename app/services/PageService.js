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
    .service('PageService', function($log, alertify, ApiService, AuthService){
        var uriPage = '/pages';
        var uriSeries = '/series';

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
            $log.debug('PageService: initProjectList function');
            if(seriesId){
                $log.debug('Create Page List');
                var result = pageInit(param, seriesId);
            } else {
                $log.debug('Create Series List');
                var result = seriesInit(param.series);
            }
            return result;
        };

        this.getUserPermissions = function(seriesId){
            if(inArray(getEditPermissions(), seriesId)){
                return true;
            }
            return false;
        }

        /**
         * @ngdoc method
         * @name seriesInit
         * @methodOf nanodesuApp.service:PageService
         * @description
         * create list of series object based on users view
         *
         * @param {Object} series object from pages endpoint
         * @return {array} list of series object based on
         * user permissions and the series is not deleted
         */
        function seriesInit(param){
            $log.debug('PageService: seriesInit function');
            var data = param;
            var tempResult = [];
            angular.forEach(
                data,
                function(param){
                    $log.debug('param: '+param.id+' name: '+param.name);
                    $log.debug('for: '+param.name+'status: '+inArray(getViewPermissions(),param.id));
                    if(inArray(getViewPermissions(), param.id)){
                        var series = {};
                        series.name = param.name;
                        series.id = param.id;
                        series.deleted = param.config.deleted;
                        series.status = param.config.status;
                        series.created = param.config.created;
                        series.updated = param.config.updated;
                        this.push(series);
                    }
                },
                tempResult
            );
            var result = removeDeletedSeries(tempResult);
            $log.debug(result);
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
                    if(inArray(getEditPermissions(), param.series)){
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
            $log.debug('PageService: getEditPermissions function');
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
            $log.debug('PageService: removeDeletedSeries function');
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
            $log.debug(result);
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
            $log.debug('PageService: removeDeletedSeries function');
            var data = page;
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
            $log.debug(result);
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
