'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:controller:GenerateCtrl
 * @description
 * # GenerateCtrl
 * Controller of the nanodesuApp
 */

angular.module('nanodesuApp')
    .controller('GenerateCtrl', function ($scope, alertify, GenerateService, NavService) {
        // TODO: Since this is a must in every controller need better way to avoid this
        $scope.loader = false; 

        NavService.setActive("build");

        $scope.build = function(){
            $scope.loader = true; 
            GenerateService.query(function(success){
                $scope.loader = false; 
                alertify.success("Success Generate the Blog")
            }, function(error){
                alertify.error("Error! Please Contact the Admin");
            });
        }
    });
