(function(){
'use strict';

/**
 * @ngdoc controller
 * @name nanodesuApp.controller:UserAddCtrl
 * @description
 * Controller for Add new User or Edit Existing User
 */
angular.module('nanodesuApp')
    .controller('UserAddCtrl', function($log, $scope, $routeParams, UserResources, SeriesResources, AuthService){
        var username = $routeParams.username;
        $scope.passwd = true; // model to hide password field when edit user
        $scope.user = getUser(username);
        // hold permission view and edit
        $scope.view = {};
        $scope.edit = {};

        $scope.series = SeriesResources.query();

        /**
         * @ngdoc method
         * @name pass
         * @methodOf nanodesuApp.controller.MainCtrl
         * @description
         * change value for $scope.passwd
         * 
         * @param {boolean} true
         */
        $scope.pass = function(param){
            $scope.passwd = param;
        };

        $scope.submit = function() {
            $log.debug('UserAddCtrl: submit function');

            var data = reformatData($scope.user);
            if(username){
                $log.debug('update');

                UserResources.update(data);
                AuthService.newPermissions(data);

            } else {
                $log.debug('insert');

                UserResources.save(data);
            }
        };

        /**
         * @ngdoc method
         * @name getUser
         * @methodOf nanodesuApp.controller.MainCtrl
         * @description
         * create new user object or retrieve from API
         * 
         * @param {string} username
         * @return {Object} User
         */
        function getUser(userName) {
            $log.debug('UserAddCtrl: perform populate user object for data binding in html form');
            var user = {};
            if(userName){
                $log.debug('username exist');

                UserResources.get(function(success) {
                    var tempUsers = findUser(success.users);
                    $scope.user = reverseData(tempUsers);
                    // hide password field
                    $scope.passwd = false;
                }, function(error) {});

            } else {
                $log.debug('username not exist');

                user = {
                    'username': '',
                    'password': '',
                    'permissions': {
                        'view': [],
                        'edit': [],
                        'admin': ''
                    }
                };
            }

            return user;
        }

        /**
         * @ngdoc method
         * @name findUser
         * @methodOf nanodesuApp.controller.MainCtrl
         * @description
         * private function to distinct user in user list by username
         * use for edit user
         * 
         * @param {array} list of users
         * @return {array} single users
         */
        function findUser(data){
            $log.debug('UserAddCtrl: find user in list of array');

            var result = [];

            angular.forEach(
                data,
                function(param){
                    if(param.username === username){
                        this.push(param);
                    }
                },
                result
            );

            return result;
        }

        /**
         * @ngdoc method
         * @name reformatData
         * @methodOf nanodesuApp.controller.MainCtrl
         * @description
         * private function in use to convert object view and edit
         * into array in order save permissions
         *
         * @param {Object} seriesId: true
         * @return {Object} users
         */
        function reformatData(data){
            $log.debug('UserAddCtrl: reformat data from HTML into specify format that can be accepted by API');

            var result = data;
            var tempView = [];
            var tempEdit = [];

            // view permissions
            angular.forEach(
                $scope.view, 
                function(value, key){
                    if(value === true){
                        this.push(key);
                    }
                }, 
                tempView);

            // edit permissions
            angular.forEach(
                $scope.edit, 
                function(value, key){
                    if(value === true){
                        this.push(key);
                    }
                }, 
                tempEdit);

            result.permissions.view = tempView;
            result.permissions.edit = tempEdit;

            return result;
        }

        /**
         * @ngdoc method
         * @name reverseData
         * @methodOf nanodesuApp.controller.MainCtrl
         * @description
         * convert data from API into ng-model for html
         * 
         * @param {array} single array
         * @return {object} ng-model for users
         */
        function reverseData(param){
            $log.debug('UserAddCtrl: reformat data from API to match with HTML binding');

            var result = {};
            result.permissions = {};

            result.username = param[0].username;
            result.permissions.admin = param[0].perms.admin;
            $scope.view = arrayToObject(param[0].perms.view);
            $scope.edit = arrayToObject(param[0].perms.edit);

            return result;
        }

        /**
         * @ngdoc method
         * @name arrayToObject
         * @methodOf nanodesuApp.controller.MainCtrl
         * @description
         * private function in use to convert array view and edit
         * into model for shown in html list permission
         *
         * @param {array} view/edit permissions
         * @return {object} seriesId: true
         */
        function arrayToObject(param){
            $log.debug('UserAddCtrl: convert from aray to object');

            var result = {};
            for(var i = 0; i < param.length; i++){
                var name = param[i];
                result[name] = true;
            }

            return result;
        }
    });
})();
