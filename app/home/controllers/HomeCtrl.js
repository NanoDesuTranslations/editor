'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nanodesuApp
 */

angular.module('nanodesuApp')
    .controller('HomeCtrl', function ($scope, $location, AuthService) {
        $scope.signIn = function () {
            // TODO: redirect to sign-in page.
        }

        $scope.isLogin = function () {
            return AuthService.isLogin();
        }
    });
