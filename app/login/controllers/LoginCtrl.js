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
            // The service call below is for the shortened, temp auth systen. Real args will be username + password.
            AuthService.login($scope.token);
        };

        $scope.logOut = function () {
            AuthService.logout();
            $scope.token = null;
        };

        $scope.token = AuthService.userName();

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
            return AuthService.userName();
        };
    });
