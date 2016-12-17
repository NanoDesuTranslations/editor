(function(){
'use strict';

/**
 * @ngdoc controller
 * @name nanodesuApp.controller:UserCtrl
 * @description
 * Controller for User Management
 */
angular.module('nanodesuApp')
    .controller('UserCtrl', function($log, $scope, alertify, ApiService){
        var uri = '/admin/users';
        ApiService.setUrl(uri);

        ApiService.http().query(
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

        $scope.delete = function(userId) {
            alertify.confirm('Are You Sure?', function(){
                $log.debug('Yes BUtton was choosen');
                ApiService.setUrl(uri);

                ApiService.http().delete(
                    {'id': userId},
                    function(success){
                        $log.debug(success);
                        alertify.success('Success! Users with id: '+userId+' is already deleted');
                    },
                    function(error){
                        $log.debug(error);
                        alertify.error('Error! Please Contact Admin');
                    }
                );
            }, function(){
                $log.debug('Cancel Button was choosen');
            });
        }
    });
})();
