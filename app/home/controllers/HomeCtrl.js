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

        //// local function refreshData - queries for the series list so that it can properly be displayed.
        // TODO: for non-admins, need a way to get this list without the Series API, shich is admin-only.
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
                // TODO: use a model/view friendly way to show status.
                alert("Info: Series "+idSeries+" deleted.");
                refreshData();
            }, function (error) {
                alert("Info: error! No changes." + error.toString());
            });
        };

        //// function openSeries - opens the Series page with the specified series ID.
        ////  Parameter idSeries: if blank, open the series properties to creaet a new series.
        $scope.openSeries = function(idSeries) {
            var path = "/series";
            if(idSeries == null){
                path = "/series/add";
            }else {
                path = "/page/"+idSeries; // TODO: for now, this page lists the pages in the series. Really belongs in the Series area.
            }
            $location.path(path);
        }
    });
