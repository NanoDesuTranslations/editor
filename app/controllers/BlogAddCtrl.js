(function(){
'use strict';

/**
 * @ngdoc controller
 * @name nanodesuApp.controller:BlogAddCtrl
 * @description
 * Controller for Add new Blog or Edit Existing Blog
 */
angular.module('nanodesuApp')
    .controller('BlogAddCtrl', function($log, $scope, $routeParams, alertify, AuthService, ApiService, PageService){
        var uri = '/pages';
        var simpleMde = new SimpleMDE(document.getElementById('content'));
        var seriesId = $routeParams.seriesId;
        var pageId = $routeParams.pageId;
        $scope.blog = init();
        $scope.title = false; // before the data save, don't show back button

        /* angular-ui bootstrap for collapse */
        $scope.isCollapsed = false;
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

        ApiService.setUrl(uri);
        ApiService.http().get(
            function(success){
                $log.debug(success);
                $scope.series = PageService.getSeriesNameAndId(success.series, seriesId);
            },
            function(error){
                $log.debug(error);
                alertify.error('Error! Please Contact Admin');
            }
        );

        $scope.submit = function(){
            $log.debug('BlogAddCtrl: init function');
            var data = reformatData($scope.blog);
            if(pageId){
                $log.debug('edit');
                PageService.update(data, pageId);
                $scope.title = true;
            } else {
                $log.debug('save');
                PageService.save(data);
                $scope.title = true;
            }
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
            $log.debug('BlogAddCtrl: init function');
            var blog = {};
            if(pageId){
                ApiService.setUrl(uri);
                ApiService.http().get(
                    {'id': pageId},
                    function(success){
                        $log.debug(success);
                        $log.debug(success.page);
                        $scope.blog = reverseData(success.page);
                    },
                    function(error){
                        $log.debug(error);
                        alertify.error('Error! Please Contact Admin');
                    }
                );
            } else {
                $log.debug('create new');
                blog = {
                    'content': null,
                    'series': seriesId,
                    'meta': {
                        'title': null,
                        'status': '5',
                        'created': $nd.createEpochTime(),
                        'updated': null,
                        'deleted': false,
                        'blog': {
                            'pinned': 0,
                            'published_date': null,
                            'author': AuthService.getUsername() 
                        }
                    }
                };
            }
            $log.debug(blog);
            return blog;
        }

        /**
         * @ngdoc method
         * @name reformatData
         * @methodOf nanodesuApp.controller.BlogAddCtrl
         * @description
         * private function to reformat data from html so it 
         * can be saved
         *
         * @param {Object} $scope.blog
         * @return {Object} blog
         */
        function reformatData(param){
            $log.debug('BlogAddCtrl: reformatData function');
            var data = param;
            $log.debug(data.meta.blog.published_date);
            data.meta.blog.published_date = $nd.convertToEpochTime(data.meta.blog.published_date);
            data.content = simpleMde.value();
            data.meta.status = $nd.string2Int0(data.meta.status);
            return data;
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
            $log.debug('BlogAddCtrl: reverseData function');
            var data = param;
            data.meta.status = data.meta.status.toString();
            data.meta.blog.published_date = $nd.convertToUtc(data.meta.blog.published_date);
            data.meta.updated = $nd.createEpochTime();
            simpleMde.value(data.content);
            return data;
        }
    });
})();
