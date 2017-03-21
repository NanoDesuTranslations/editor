(function(){
'use strict';

/**
 * @ngdoc controller
 * @name nanodesuApp.controller:BlogAddCtrl
 * @description
 * Controller for Add new Blog or Edit Existing Blog
 */
angular.module('nanodesuApp')
    .controller('BlogAddCtrl', function($log, $scope, $routeParams, $timeout, $uibModal, alertify, AuthService, ApiService, PageService){
        var simpleMde = new SimpleMDE(document.getElementById('content'));
        var seriesId = $routeParams.seriesId;
        var pageId = $routeParams.pageId;
        var edit = 0; //flag when open edit menu
        $scope.blog = init();

        $scope.help = function(){
            $uibModal.open({
                controller: 'BlogAddCtrl',
                templateUrl: 'views/templates/modal/manual_editor.html',
                size: 'lg'
            });
        };
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

        simpleMde.codemirror.on('change', function(){
            $log.debug(edit);
            $log.debug(edit === 5);
            if(edit === 5){
                $log.debug('isDirty?');
                $timeout(function(){
                    $scope.blogForm.$setDirty();
                });
            }
            edit++;
        });

        ApiService.setUrl($nd.pages);
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
            var data = $scope.blog;
            if(pageId){
                $log.debug('edit');
                PageService.update(reformatData(data), pageId);
            } else {
                $log.debug('save');
                PageService.save(reformatData(data));
            }
            $scope.blog = init();
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
            $log.debug('BlogAddCtrl: init function');
            var blog = {};
            if(pageId){
                ApiService.setUrl($nd.pages);
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
                            'published_date': new Date(),
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
            data.meta.blog.published_date = $nd.convertToEpochTime(param.meta.blog.published_date);
            $log.debug(data.meta.blog.published_date);
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
