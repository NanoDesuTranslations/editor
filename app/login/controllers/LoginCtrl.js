'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:controller:MainCtrl
 * @description
 * # LoginCtrl
 * Controller of the nanodesuApp
 */

angular.module('nanodesuApp')
    .controller('LoginCtrl', function($scope, $cookies, AuthService){

        $scope.logIn = function () {
            $cookies.put('token', $scope.token);
        };

        $scope.logOut = function () {
            $cookies.remove('token');
        };

        $scope.isLogin = function () {
            var status
            if ($cookies.get('token')) {
                status = true;
            } else {
                status = false;
            }
            return status;
        };

        $scope.loginName = function () {
            return $cookies.get('token');
        };
    });
