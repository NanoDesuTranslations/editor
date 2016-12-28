(function(){
'use strict';

/**
 * @ngdoc controller
 * @name nanodesuApp.controller:MainCtrl
 * @description
 * Controller for Main Page
 */
angular.module('nanodesuApp')
    .controller('MainCtrl', function($log, $scope, alertify, ApiService, AuthService){
        $scope.isAdmin = AuthService.isAdmin();
        $scope.panel = false; //in purpose to hide or shown panel deploy and preview button

        /**
         * @ngdoc method
         * @name panelAction
         * @methodOf nanodesuApp.controller.MainCtrl
         * @description
         * function to change $scope.panel value
         *
         * @param {boolean} true/false
         */
        $scope.panelAction = function(param){
            $scope.panel = param;
        };

        $scope.preview = function(){
            ApiService.setUrl($nd.preview);
            ApiService.http().get(
                function(success){
                    $log.debug(success);
                    alertify.success('Success! Please Check at /test');
                },
                function(error){
                    $log.debug(error);
                    alertify.error('Error! Please Contact Admin');
                }
            );
        };

        $scope.deploy = function(){
            ApiService.setUrl($nd.deploy);
            ApiService.http().get(
                function(success){
                    $log.debug(success);
                    alertify.success('Success! Please Check at');
                },
                function(error){
                    $log.debug(error);
                    alertify.error('Error! Please Contact Admin');
                }
            );
        };
    });
})();
