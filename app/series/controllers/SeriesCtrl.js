'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:controller:SeriesCtrl
 * @description
 * # SeriesCtrl
 * Controller of the nanodesuApp
 */

angular.module('nanodesuApp')
    .controller('SeriesCtrl', function($scope, $location, SeriesService){
        
        $scope.data = SeriesService.query(function(success){
            //console.log(success);
        }, function(error){
            //console.log(error);
        });

        $scope.delete = function(idSeries){
            SeriesService.delete({id: idSeries}, function(success){
                alert("success");
            }, function(error){
                alert("error");
            });
        }

        $scope.redirect = function(idSeries){
            var path = "/series";
            if(idSeries == null){
                path = "/series/add";
            }else {
                path = "/series/edit/"+idSeries;
            }
            $location.path(path);
        }
    });
