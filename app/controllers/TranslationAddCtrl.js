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
    .controller('TranslationAddCtrl', function($log, $scope, $routeParams, $timeout, alertify, ApiService, PageService){
        var simpleMde = new SimpleMDE(document.getElementById('content'));
        var seriesId = $routeParams.seriesId;
        var pageId = $routeParams.pageId;

        /**
         * angular-ui bootstrap for collapse
         */
        $scope.isCollapsed = false;
        $scope.page = getPages();

        $timeout(
            function(){
                $scope.translationForm.$setDirty();
            }, 
            10000
        );

        ApiService.setUrl($nd.pages);
        ApiService.http().get(
            function(success){
                $log.debug(success);
                $scope.series = PageService.getSeriesNameAndId(success.series, seriesId);
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
                $scope.translationForm.$setPristine();
            } else {
                $log.debug('save');
                PageService.save(data);
                $scope.done = true;
                $scope.translationForm.$setPristine();
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
                ApiService.setUrl($nd.pages);
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
                simpleMde.value();
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
            data.content = simpleMde.value();
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
            simpleMde.value(page.content);
            return page;
        }


    });
})();
 
