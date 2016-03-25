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
            //console.log($scope.username+""+$scope.password);
            var status = AuthService.login($scope.username,$scope.password);
            if(status == "Success"){
                console.log("Log in Success");
                $cookies.put('auth','nano');
                AuthService.isLogin(true);
                console.log(AuthService.isLogin())
                //$cookies.remove('auth');
            }else if(status == "Failed"){
                console.log("Log in Failed");
            }
        }
    });
