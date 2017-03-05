(function(){
'use strict';

/**
 * @ngdoc controller
 * @name nanodesuApp.controller:UserCtrl
 * @description
 * Controller for User Management
 */
angular.module('nanodesuApp')
    .controller('UserCtrl', function($log, $window, $scope, alertify, ApiService){
        ApiService.setUrl($nd.user);

        ApiService.http().get(
            function(success){
                $log.debug('Success Retrieve Users Data');
                $scope.users = success.users;
                $log.debug($scope.users);
            },
            function(error) {
                $log.debug('Error!'+error);
                alertify.error('Error! Please Contact Admin');
            }
        );

        $scope.delete = function(username) {
            alertify.confirm('Are You Sure?', function(){
                $log.debug('Yes Button was choosen');
                ApiService.setUrl($nd.user + '/' + username);

                ApiService.http().delete(
                    function(success){
                        $log.debug(success);
                        alertify.success('Success! Users with username: ' + username + ' is already deleted');
                        $window.location.reload();
                    },
                    function(error){
                        $log.debug(error);
                        alertify.error('Error! Please Contact Admin');
                    }
                );
            }, function(){
                $log.debug('Cancel Button was choosen');
            });
        };
    });
})();
