(function(){
'use strict';

/**
 * @ngdoc controller
 * @name nanodesuApp.controller:LoginCtrl
 * @description
 * Controller for Login Action
 */
angular.module('nanodesuApp')
    .controller('LoginCtrl', function($log, $scope, $window, AuthService){
        $scope.isNavCollapsed = true; // for responsive navigation in index.html
        $scope.isLogin = AuthService.isLogin();
        $scope.isAdmin = AuthService.isAdmin();
        $scope.getUsername = AuthService.getUsername();

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
        };

        /**
         * @ngdoc method
         * @name logout
         * @methodOf nanodesuApp.controller.LoginCtrl
         * @description
         * remove all credentials and redirect into login page
         */
        $scope.logout = function() {
            AuthService.logout();
            $window.location.href = '#/login';
        };

    });
})();
