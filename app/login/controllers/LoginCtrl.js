'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:controller:MainCtrl
 * @description
 * # LoginCtrl
 * Controller of the nanodesuApp
 */

angular.module('nanodesuApp')
    .controller('LoginCtrl', function($scope, $location, AuthService, NavService){
         // short-term storage for credentials that really should exist only while view is live.
        $scope.cred = {} ;
        $scope.cred.sName = "";
        $scope.cred.sPW = "";

        $scope.logIn = function () {
            // The service call below is for the shortened, temp auth systen. Real args will be username + password.
            AuthService.login($scope.cred.sName, $scope.cred.sPW)
                .then(function(res) {
                    $nd.warn("AuthService login, success response.")
                    // Route to main page on success.
                    $scope.cred = {}; // get rid of this when we no longer need it.
                    $location.path("/");
                },function(err) {
                    // TODO: show error?

                    $nd.warn("AuthService login, failed response.")
                });
            // remove the password
            $scope.cred.sPW = "";
        };

        $scope.logOut = function () {
            AuthService.logout();
            $scope.token = null;
        };

        $scope.token = AuthService.userName();

        $scope.isLogin = function () {
            var status = AuthService.isLogin();
            return status;
        };

        $scope.loginName = function () {
            return AuthService.userName();
        };

        // This section is a helper for the nav bar on the front page.  Because the login status was already being used there.

        $scope.hasSeries = function () {
            return NavService.hasSeries();
        }
        $scope.hasPage = function () {
            return NavService.hasPage();
        }
        $scope.gotoSeries = function () {
            NavService.gotoSeries();
        }
        $scope.gotoPage = function () {
            NavService.gotoPage();
        }
        $scope.curActive = function () {
            return NavService.curActive();
        }
    });
