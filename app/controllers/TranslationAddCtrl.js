(function(){
'use strict';

/**
 * @ngdoc controller
 * @name nanodesuApp.controller:TranslationAddCtrl
 * @description
 * Controller for Add new Page or Edit Existing Page
 * example JSON from /pages/:id
 * 'page': {
 *  'series': seriesId,
 *  'id': pageId,
 *  'content': content of the page,
 *  'meta': {
 *    'title': title of the pages
 *    'status': draft, hiddend, or published
 *    'order': the order of the page
 *    'path': optional url
 *    'created': unix time
 *    'updated': unix time
 *    'deleted': true or false
 *    'blog': if exist is become object, else false
 *    hierarchy for the rest
 *  }
 * }
 */
angular.module('nanodesuApp')
    .controller('TranslationAddCtrl', function($log, $scope, $routeParams, alertify, ApiService, PageService){
        var uri = '/pages';
        var seriesId = $routeParams.seriesId;
        var pageId = $routeParams.pageId;

        /**
         * angular-ui bootstrap for collapse
         */
        $scope.isCollapsed = false;
        $scope.page = getPages();

        ApiService.setUrl(uri);
        ApiService.http().get(
            function(success){
                $log.debug(success);
                $scope.series = getSeriesNameAndId(success.series);
                // to separate when create or edit page
                if(!pageId){ 
                    $scope.hierarchy = PageService.getSeriesHierarchy(success.series, seriesId);
                }
            },
            function(error){
                $log.debug(error);
                alertify.error('Error! Please Contact Admin');
            }
        );

        $scope.submit = function(){
            $log.debug('TranslationAddCtrl: submit function');
            var data = reformatData($scope.page);
            $log.debug(data);
            if(pageId){
                $log.debug('edit');
                PageService.update(data, pageId);
            } else {
                $log.debug('save');
                PageService.save(data);
            }
        };

        /**
         * @ngdoc method
         * @name getPages
         * @methodOf nanodesuApp.controller.TranslationAddCtrl
         * @description
         * create page object depend it's new or existing
         *
         * @return {Object} page
         */
        function getPages(){
            $log.debug('TranslationAddCtrl: getPages function');
            var pages = {};
            pages.meta = {};
            if(pageId){
                ApiService.setUrl(uri);
                ApiService.http().get(
                    {'id': pageId},
                    function(success){
                        $log.debug(success);
                        $scope.hierarchy = PageService.getExistingHierarchy(success);
                        $scope.page = reverseData(success.page);
                    },
                    function(error){
                        $log.debug(error);
                        alertify.error('Error! Please Contact Admin');
                    }
                );
            } else {
                $log.debug('Create New');
                mdeEditor().value();
                pages = {
                    'content': null,
                    'series': seriesId,
                    'meta': {
                        'title': null,
                        'status': '5',
                        'order': null,
                        'path': null,
                        'created': $nd.createEpochTime(),
                        'updated': null,
                        'blog': false
                    }
                };
            }
            $log.debug(pages);
            return pages;
        }

        /**
         * @ngdoc method
         * @name reformatData
         * @methodOf nanodesuApp.controller.TranslationAddCtrl
         * @description
         * private function to clean data from html such as convert string to int
         * add content from simpleMDE, restructure the hierarchy
         *
         * @param {Object} $scope.page
         * @return {Object} page
         */
        function reformatData(param){
            $log.debug('TranslationAddCtrl: reformatData function');
            var data = param;
            data.content = mdeEditor().value();
            data.meta.status = $nd.string2Int0(data.meta.status);
            if(data.meta.order){
                data.meta.order = $nd.string2Int0(data.meta.order);
            }
            angular.forEach(
                $scope.hierarchy,
                function(param){
                    $log.debug(param);
                    if(param.value){
                        data.meta[param.label] = param.value.toString();
                    }
                }
            );
            $log.debug(data);
            return data;
        }

        /**
         * @ngdoc method
         * @name reverseData
         * @methodOf nanodesuApp.controller.TranslationAddCtrl
         * @description
         * private function to convert data from /pages/:id endpoint
         * into ng-model in html
         *
         * @param {Object} page
         * @return {Object} page
         */
        function reverseData(page){
            $log.debug('TranslationCtrl: reverseData function');
            page.meta.status = page.meta.status.toString();
            page.meta.updated = $nd.createEpochTime();
            mdeEditor().value(page.content);
            return page;
        }

        /**
         * @ngdoc method
         * @name mdeEditor
         * @methodOf TranslationAddCtrl
         * @description
         * This function does two things.  
         * One: it breaks the rules by directly manipulating the DOM from an AngularJS controller. 
         * Two: it allows delaying until the last possible moment the time when the SimpleMDE markdown 
         * editor is initialized. 
         *  
         * @return {Object} simpleMDE
         */
        var mde = null;
        function mdeEditor(){
            if(!mde){
                mde = new SimpleMDE(document.getElementById("content"));
            }
            return mde;
        }

        /**
         * @ngdoc method
         * @name getSeriesNameAndId
         * @methodOf nanodesuApp.controller:TranslationAddCtrl
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
 
