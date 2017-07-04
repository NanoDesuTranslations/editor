(function(){
'use strict';

/**
 * @ngdoc controller
 * @name nanodesuApp.controller:BlogAddCtrl
 * @description
 * Controller for Add new Blog or Edit Existing Blog
 */
angular.module('nanodesuApp')
    .controller('BlogAddCtrl', function($log, $scope, $routeParams, $timeout, AuthService, PagesResources, PageService){
        var simpleMde = new SimpleMDE(document.getElementById('content'));
        var edit = 0; //flag when open blog menu and start editing on simplemde
        var seriesId = $routeParams.seriesId;
        var pageId = $routeParams.pageId;

        simpleMde.codemirror.on('change', function() {
            if(edit === 5) {
                $timeout(function() {
                    $scope.blogForm.$setDirty();
                });
            }
            edit++;
        });

        $scope.blog = init();

        /* Related to Angular Bootstrap DatePicker */
        $scope.today = function(){
            $scope.blog.meta.blog.published_date = new Date();
        };

        $scope.popup = {
            'opened': false
        };

        $scope.openDate = function(){
            $scope.popup.opened = true;
        };
        /* end */

        PagesResources.get(function(success) {
            $scope.series = PageService.getSeriesNameAndId(success.series, seriesId);
        }, function(error) {});

        $scope.submit = function(){
            $log.debug('BlogAddCtrl: submit into API');

            $scope.blog.meta.blog.published_date = $nd.convertToEpochTime($scope.blog.meta.blog.published_date);
            $scope.blog.content = simpleMde.value();
            $scope.blog.meta.status = $nd.string2Int0($scope.blog.meta.status);

            if(pageId){
                $log.debug('edit');
                PagesResources.update({id: pageId}, $scope.blog, function(success) {
                    $scope.blog.meta.blog.published_date = $nd.convertToUtc($scope.blog.meta.blog.published_date);
                    $scope.blog.meta.status = $scope.blog.meta.status.toString();
                }, function(error) {});
            } else {
                $log.debug('save');
                PagesResources.save($scope.blog, function(success) {
                    $scope.blog.meta.blog.published_date = $nd.convertToUtc($scope.blog.meta.blog.published_date);
                    $scope.blog.meta.status = $scope.blog.meta.status.toString();
                }, function(error) {});
            }
            $scope.blogForm.$setPristine();
        };

        /**
         * @ngdoc method
         * @name init
         * @methodOf nanodesuApp.controller.BlogAddCtrl
         * @description
         * Create object pages depending is new or edit
         *
         * @return {Object} page
         */
        function init(){
            $log.debug('BlogAddCtrl: populate data either is exist or new');

            var blog = {};
            if(pageId){
                $log.debug('exisiting data');

                PagesResources.get({id: pageId}, function(success) {
                    $scope.blog = reverseData(success.page);
                }, function(error) {});

            } else {
                $log.debug('create new');

                blog = {
                    'content': null,
                    'series': seriesId,
                    'meta': {
                        'title': null,
                        'nav_title': null,
                        'status': '5',
                        'created': $nd.createEpochTime(),
                        'updated': null,
                        'deleted': false,
                        'blog': {
                            'pinned': 0,
                            'published_date': new Date(),
                            'author': AuthService.getUsername()
                        }
                    }
                };
            }

            return blog;
        }

        /**
         * @ngdoc method
         * @name reverseData
         * @methodOf nanodesuApp.controller.BlogAddCtrl
         * @description
         * private function to convert data from /endpoint page object
         * to HTML $scope
         *
         * @param {Object} page
         * @return {Object} page
         */
        function reverseData(param){
            $log.debug('BlogAddCtrl: reverse data from API so it can be binding to HTML');

            var data = param;
            data.meta.status = data.meta.status.toString();
            data.meta.blog.published_date = $nd.convertToUtc(data.meta.blog.published_date);
            data.meta.updated = $nd.createEpochTime();
            simpleMde.value(data.content);
            return data;
        }
    });
})();
