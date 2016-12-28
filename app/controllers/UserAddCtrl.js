(function(){
'use strict';

/**
 * @ngdoc controller
 * @name nanodesuApp.controller:UserAddCtrl
 * @description
 * Controller for Add new User or Edit Existing User
 */
angular.module('nanodesuApp')
    .controller('UserAddCtrl', function($log, $scope, $routeParams, alertify, ApiService, AuthService){
        var username = $routeParams.username;
        $scope.passwd = true; // model to hide password field when edit user
        $scope.user = getUser(username);
        // hold permission view and edit
        $scope.view = {};
        $scope.edit = {};

        ApiService.setUrl($nd.series);
        ApiService.http().query(
            function(success){
                $log.debug('retrieve series data');
                $log.debug(success);
                $scope.series = success;
            }
        );

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
            $log.debug($scope.user);
            ApiService.setUrl($nd.user);
            var data = reformatData($scope.user);
            $log.debug(data);
            if(username){
                $log.debug('update');
                ApiService.http().update(
                    data,
                    function(success){
                        $log.debug(success);
                        AuthService.newPermissions(data);
                        alertify.success('Success! Update User Data');
                    },
                    function(error){
                        $log.debug(error);
                        alertify.error('Error! Please Contact Admin');
                    }
                );
            } else {
                $log.debug('insert');
                ApiService.http().save(
                    data,
                    function(success){
                        $log.debug(success);
                        alertify.success('Success! Save User Data');
                    },
                    function(error){
                        $log.debug(error);
                        alertify.error('Error! Please Contact Admin');
                    }
                );
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
            $log.debug('UserAddCtrl: getUser function');
            $log.debug('username: '+userName);
            var user = {};
            if(userName){
                $log.debug('username exist');
                ApiService.setUrl($nd.user);
                ApiService.http().get(
                    function(success){
                        // convert from api into ng-model
                        var temp = findUser(success.users);
                        $scope.user = reverseData(temp);
                        // hide password field
                        $scope.passwd = false;
                    },
                    function(error){
                        $log.debug(error);
                        alertify.error('Error! Please Contact Admin');
                    }
                );
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
            $log.debug('UserAddCtrl: findUser function');
            $log.debug(data);
            var result = [];
            angular.forEach(
                data,
                function(param){
                    $log.debug('param: '+ param.username);
                    $log.debug('username: '+ username);
                    if(param.username === username){
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
            $log.debug('UserAddCtrl: reformatData function');
            $log.debug(data);
            $log.debug($scope.view);
            $log.debug($scope.edit);
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
            $log.debug('UserAddCtrl: reverseData function');
            $log.debug(param[0].perms);
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
            $log.debug('UserAddCtrl: arrayToObject function');
            $log.debug(param);
            var result = {};
            for(var i = 0; i < param.length; i++){
                var name = param[i];
                result[name] = true;
            }
            $log.debug(result);
            return result;
        }
    });
})();
