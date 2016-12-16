(function(){
'use strict';

/**
 * @ngdoc controller
 * @name nanodesuApp.controller:LoginCtrl
 * @description
 * Controller for Login Action
 */
angular.module('nanodesuApp')
    .controller('LoginCtrl', function($log, $scope, $location, AuthService){
        $scope.isNavCollapsed = true; // for responsive navigation in index.html

        /**
         * @ngdoc method
         * @name login
         * @methodOf nanodesuApp.controller.LoginCtrl
         * @description
         * Method to hit login endpoint and redirect into home page
         */
        $scope.login = function(){
            $log.debug('LoginCtrl: login function');
            var username = $scope.username;
            var password = $scope.password;
            $log.debug(username+' '+password);
            AuthService.login(username, password);
        }

        /**
         * @ngdoc method
         * @name logout
         * @methodOf nanodesuApp.controller.LoginCtrl
         * @description
         * remove all credentials and redirect into login page
         */
        $scope.logout = function() {
            AuthService.logout();
            $location.path('login');
        }

        /**
         * @ngdoc method
         * @name isLogin
         * @methodOf nanodesuApp.controller.LoginCtrl
         * @description
         * check if the current user is already login or not
         * @return {boolean} login or not
         */
        $scope.isLogin = function() {
            return AuthService.isLogin();
        }

        /**
         * @ngdoc method
         * @name getUsername
         * @methodOf nanodesuApp.controller.LoginCtrl
         * @description
         * get username
         * @return {string} username
         */
        $scope.getUsername = function() {
            return AuthService.getUsername();
        }
    });
})();
