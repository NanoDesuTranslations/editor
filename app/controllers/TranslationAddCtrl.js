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
 *    'nav_title': navigation menu title of the pages
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
    .controller('TranslationAddCtrl', function($log, $scope, $routeParams, PagesResources, PageService){
        var seriesId = $routeParams.seriesId;
        var pageId = $routeParams.pageId;

        $scope.tinymceOptions = $nd.tinymceOptions;

        $scope.page = getPages();

        PagesResources.get(function(success) {
            $scope.series = PageService.getSeriesNameAndId(success.series, seriesId);
            // to separate when create or edit page
            if(!pageId){
                $scope.hierarchy = PageService.getSeriesHierarchy(success.series, seriesId);
            }
        }, function(error) {});

        $scope.submit = function(){
            $log.debug('TranslationAddCtrl: submit function');

            $scope.page.meta.status = $nd.string2Int0($scope.page.meta.status);

            if($scope.page.meta.order){
                $scope.page.meta.order = $nd.string2Int0($scope.page.meta.order);
            }

            if(pageId){
                $log.debug('edit');

                angular.forEach(
                    $scope.hierarchy,
                        function(param){
                            $scope.page.meta[param.label] = param.value;
                        }
                );

                PagesResources.update({id: pageId}, $scope.page);

            } else {
                $log.debug('save');

                angular.forEach(
                    $scope.hierarchy,
                        function(param){
                            // if the hierarchy is null don't send it into server
                            if(param.value){
                                $scope.page.meta[param.label] = param.value;
                            }
                        }
                );

                PagesResources.save($scope.page);

                $scope.done = true;
            }
            $scope.translationForm.$setPristine();
            $scope.page = getPages();
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
            $log.debug('TranslationAddCtrl: populate the HTML binding with existing or empty data');
            var pages = {};
            pages.meta = {};

            if(pageId){
                $log.debug('The data is existing');

                PagesResources.get({id: pageId}, function(success) {
                    $scope.hierarchy = PageService.getExistingHierarchy(success);
                    $scope.page = reverseData(success.page);
                }, function(error) {});

            } else {
                $log.debug('Create New');
                pages = {
                    'content': null,
                    'series': seriesId,
                    'meta': {
                        'title': null,
                        'nav_title': null,
                        'status': '5',
                        'order': null,
                        'path': null,
                        'created': $nd.createEpochTime(),
                        'updated': null,
                        'blog': false
                    }
                };
            }

            return pages;
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
            $log.debug('TranslationCtrl: reverse data from API so it will be match with HTML binding');

            page.meta.status = page.meta.status.toString();
            page.meta.updated = $nd.createEpochTime();
            return page;
        }


    });
})();

