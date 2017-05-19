(function(){
'use strict';

/**
 * @ngdoc controller
 * @name nanodesuApp.controller:UserCtrl
 * @description
 * Controller for User Management
 */
angular.module('nanodesuApp')
    .controller('UserCtrl', function($log, $window, $scope, alertify, UserResources){

        UserResources.get(function(success) {
            $scope.users = success.users;
        }, function(error) {});

        $scope.delete = function(username) {
            alertify.confirm('Are You Sure?', function(){

                UserResources.delete({username: username});
                $window.location.reload();

            }, function(){
                $log.debug('Cancel Button was choosen');
            });
        };
    });
})();
