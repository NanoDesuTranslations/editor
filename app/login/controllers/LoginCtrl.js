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
        $scope.logIn = function(){
            //console.log($scope.username+" "+$scope.password);
            var status = AuthService.login($scope.username,$scope.password);
            //console.log(status);
            if(status == true){
                $cookies.put('auth','nano');
            }
        }

        $scope.logOut = function(){
            AuthService.logout();
        }
    });
