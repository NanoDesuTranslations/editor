'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nanodesuApp
 */

angular.module('nanodesuApp')
    .controller('HomeCtrl', function ($scope, $location, AuthService, SeriesService, NavService) {
        $scope.signIn = function () {
            // Nothing fancy; just navigate to the sign-in page.
            $location.path("/login");
        }

        // console.log("HomeCtrl being instantiated");

        NavService.setActive("main");

        $scope.isLogin = function () {
            return AuthService.isLogin();
        }

        //// local function refreshData - queries for the series list so that it can properly be displayed.
        // TODO: for non-admins, need a way to get this list without the Series API, which is admin-only.
        function refreshData() {
            console.log("HomeCtrl refreshData running");
            SeriesService.query(function (srs) {
                $scope.data = srs;
                console.log("HomeCtrl refreshData query success");
                // console.log(srs);
            }, function (error) {
                // console.log(error);
            });
        }

        $scope.$on('$viewContentLoaded', function () {
            console.log("HomeCtrl received $viewContentLoaded");
            refreshData();
        });

        // refreshData();  // TODO: needs to be called on load.  Somehow it's not getting called on nav back to home.

        $scope.delete = function (idSeries) {
            SeriesService.delete({ id: idSeries }, function (success) {
                // TODO: use a MVC-friendly way to show result of the call.
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
                path = "/series/"+idSeries;
            }
            $location.path(path);
        }
    });
