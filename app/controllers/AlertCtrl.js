(function() {
'use strict';

/**
 * @ngdoc function
 * @name nanodesuApp:controller:AlertCtrl
 * @description
 * # Retrieve all broadcast about alert
 */
angular.module('nanodesuApp')
    .controller('AlertCtrl', function($log, $scope) {
        
        //remove alert
        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.$on('unauthorized', function() {
            $scope.alerts = [{
                    type: 'danger', 
                    msg: 'Not Authorized User! Please contact Admin for further information'
            }];
        });

        $scope.$on('login_success', function() {
            $scope.alerts = [{
                    type: 'success', 
                    msg: 'Success! Please wait you will redirect into home page' 
            }];
        });

        $scope.$on('login_failed', function() {
            $scope.alerts = [{
                    type: 'danger', 
                    msg: 'Failed! Your username or password is wrong, please try again!'
            }];
        });

        $scope.$on('created', function() {
            $scope.alerts = [{
                    type: 'success', 
                    msg: 'Success Create Data! Your data has been successfuly saved'
            }];
        });
        
        $scope.$on('updated', function() {
            $scope.alerts = [{
                    type: 'success', 
                    msg: 'Success Update Data! Your data has been successfuly updated'
            }];
        });

        $scope.$on('error', function() {
            $scope.alerts = [{
                    type: 'danger', 
                    msg: 'Failed! There was a problem in the server, please contact Admin'
            }];
        });
        
        $scope.$on('success', function() {
            $scope.alerts = [{
                    type: 'success', 
                    msg: 'Success! Your operation is success.'
            }];
        });
        
    });
})(); 
