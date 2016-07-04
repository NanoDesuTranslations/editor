'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nanodesuApp
 */

angular.module('nanodesuApp')
    .controller('HomeCtrl', function ($scope, $location, AuthService, SeriesService) {
        $scope.signIn = function () {
            $location.path("/login");
        }

        $scope.isLogin = function () {
            return AuthService.isLogin();
        }

        function refreshData() {
            $scope.data = SeriesService.query(function (success) {
                //console.log(success);
            }, function (error) {
                //console.log(error);
            });
        }

        refreshData();

        $scope.delete = function (idSeries) {
            SeriesService.delete({ id: idSeries }, function (success) {
                alert("Series deleted.");
                refreshData();
            }, function (error) {
                alert("error. No changes." + error.toString());
            });
        }

    });
