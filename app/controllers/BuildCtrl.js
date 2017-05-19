(function(){
'use strict';

/**
 * @ngdoc controller
 * @name nanodesuApp.controller:BuildCtrl
 * @description
 * Controller for Main Page
 */
angular.module('nanodesuApp')
    .controller('BuildCtrl', function($log, $scope, $resource, AuthService){
        var preview = $resource('/build');
        var deploy = $resource('/build/deploy');
        $scope.isAdmin = AuthService.isAdmin();

        $scope.preview = function(){
            preview.get();
        };

        $scope.deploy = function(){
            deploy.get();
        };
    });
})();
