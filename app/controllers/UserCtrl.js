(function(){
'use strict';

/**
 * @ngdoc controller
 * @name nanodesuApp.controller:UserCtrl
 * @description
 * Controller for User Management
 */
angular.module('nanodesuApp')
    .controller('UserCtrl', function($log, $rootScope, $scope, alertify, UserResources){

        UserResources.get(function(success) {
            $scope.users = success.users;
        }, function(error) {});


        $rootScope.$on('refreshUser', function() {
            UserResources.get(function(success) {
                $scope.users = success.users;
            }, function(error) {});
        });

        $scope.delete = function(username) {
            alertify.confirm('Are You Sure?', function(){

                UserResources.delete({username: username}, function(success) {
                    $rootScope.$broadcast('refreshUser');
                }, function(error) {});

            }, function(){
                $log.debug('Cancel Button was choosen');
            });
        };
    });
})();
