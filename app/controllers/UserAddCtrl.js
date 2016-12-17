(function(){
'use strict';

/**
 * @ngdoc controller
 * @name nanodesuApp.controller:UserAddCtrl
 * @description
 * Controller for Add new User or Edit Existing User
 */
angular.module('nanodesuApp')
    .controller('UserAddCtrl', function($log, $scope, $routeParams, alertify, ApiService){
        var uri = '/admin/users';
        var username = $routeParams.username;

        $scope.user = getUser(username);
        $log.debug('user object: '+$scope.user);

        $scope.submit = function() {
            $log.debug('UserAddCtrl: submit function');
            $log.debug($scope.user);
            ApiService.setUrl(uri);
            var data = $scope.user;
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

        function getUser(username) {
            var user = {};
            if(username != null){
                $log.debug('username: '+username);
                ApiService.httpCustom('/admin/users/:username').get(
                    {'username': username},
                    function(success){
                        $log.debug(success);
                        var param = success.users;
                        $log.debug(param.permissions);
                        user.username = param.username;
                        user.permissions.admin = param.perms.admin;
                        user.permissions.view = param.perms.view;
                        user.permissions.edit = param.perms.edit;
                    },
                    function(error){
                        $log.debug(error);
                        alertify.error('Error! Please Contact Admin');
                    }
                );
            } else {
                $log.debug('username: '+username);
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
    });
})();
 
