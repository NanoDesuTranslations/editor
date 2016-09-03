'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nanodesuApp
 */

angular.module('nanodesuApp')
    .controller('HomeCtrl', function ($scope, $location, AuthService, SeriesService, PageService, NavService) {
        $scope.signIn = function () {
            // Nothing fancy; just navigate to the sign-in page.
            $location.path("/login");
        }

        // console.log("HomeCtrl being instantiated");

        NavService.setActive("main");

        $scope.isLogin = function () {
            return AuthService.isLogin();
        }
        $scope.isAdmin = function() {
            return AuthService.isAdmin();
        }

        // To get series info for non-admins, we get the list of pages from the PageService, throw away the pages,
        // and use the series information that came with it.
        function refreshDataFromPages() {
            console.log("HomeCtrl refreshDataFromPages running");
            PageService.query(function (pages) {
                $scope.data = [];
                console.log("HomeCtrl refreshDataFromPages query success");
                // Fill in the series data from the list that was returned.
                angular.forEach(pages.series, function(element) {
                    this.push(element);
                }, $scope.data);
            }, function (error) {
                // console.log(error);
            });
        }

        function refreshDataFromSeries() {
            console.log("HomeCtrl refreshDataFromSeries running");
            SeriesService.query(function (srs) {
                $scope.data = srs;
                console.log("HomeCtrl refreshDataFromSeries query success");
                // console.log(srs);
            }, function (error) {
                // console.log(error);
            });
        }

        //// local function refreshData - queries for the series list so that it can properly be displayed.
        function refreshData() {
            if (AuthService.isAdmin()) {
                refreshDataFromSeries();
            } else {
                refreshDataFromPages();
            }
        }

        $scope.$on('$viewContentLoaded', function () {
            console.log("HomeCtrl received $viewContentLoaded");
            refreshData();
        });

        // refreshData();  // TODO: needs to be called on load.  Somehow it's not getting called on nav back to home.

        $scope.delete = function (idSeries) {
            SeriesService.get({'id': idSeries}, function(success){
                var deleted = 1;
                var series = success;
                series.config.deleted = deleted;

                SeriesService.update({'id': idSeries}, series, function(success){
                    // TODO: use a MVC-friendly way to show result of the call.
                    alert("Info: Series "+idSeries+" deleted.");
                    refreshData();
                }, function(error){
                    alert("Info: error! No changes." + error.toString());
                });
            }, function(error){
            
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
