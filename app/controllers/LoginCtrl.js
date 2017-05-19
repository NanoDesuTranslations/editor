(function(){
'use strict';

/**
 * @ngdoc controller
 * @name nanodesuApp.controller:LoginCtrl
 * @description
 * Controller for Login Action
 */
angular.module('nanodesuApp')
    .controller('LoginCtrl', function($log, $scope, $window, $resource, AuthService){
        var login = $resource('/user/login');
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
            $log.debug('LoginCtrl: perform login action');

            var data = {
                'username': $scope.username,
                'password': $scope.password
            };

            login.save(data, function(success){
                $log.debug('success login');
                $log.debug(success);

                AuthService.setUsername($scope.username);
                AuthService.storeCredentials(success);
                $log.debug('break');
                $window.location.reload();
                $window.location.href = '';
            }, function(error){});
        };

        /**
         * @ngdoc method
         * @name logout
         * @methodOf nanodesuApp.controller.LoginCtrl
         * @description
         * remove all credentials and redirect into login page
         */
        $scope.logout = function() {
            $log.debug('LoginCtrl: perform login action');

            AuthService.removeCredentials();
            $window.location.reload();
            $window.location.href = '#!/login';
        };

    });
})();
