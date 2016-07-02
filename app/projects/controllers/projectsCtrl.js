'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the nanodesuApp
 */

angular.module('nanodesuApp')
    .controller('ProjectsCtrl', function ($scope, $location, SeriesService) {

        $scope.data = SeriesService.query(function (success) {
            //console.log(success);
        }, function (error) {
            //console.log(error);
        });

        $scope.delete = function (idSeries) {
            SeriesService.delete({ id: idSeries }, function (success) {
                alert("success"); // TODO: Replace!  this is direct user interaction from the controller.
            }, function (error) {
                alert("error");   // TODO: Replace!  this is direct user interaction from the controller.
            });
        }

        $scope.redirect = function (idSeries) {
            // TODO: open the page list with the curernt series + properties editing
            var path = "/series";
            if (idSeries == null) {
                path = "/series/add";
            } else {
                path = "/series/edit/" + idSeries;
            }
            $location.path(path);
        }
    });
