'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:controller:GenerateCtrl
 * @description
 * # GenerateCtrl
 * Controller of the nanodesuApp
 */

angular.module('nanodesuApp')
    .controller('GenerateCtrl', function ($scope, GenerateService, NavService) {

        NavService.setActive("build");

        $scope.build = function(){
            GenerateService.query(function(success){
                console.log(success);
            }, function(error){
                console.log(error);
            });
        }
    });
