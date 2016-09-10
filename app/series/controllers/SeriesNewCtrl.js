'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:controller:SeriesViewCtrl
 * @description
 * # SeriesViewCtrl
 * Controller of the nanodesuApp
 */

angular.module('nanodesuApp')
    .controller('SeriesNewCtrl', function ($scope, $routeParams, $location, SeriesService, NavService) {

        NavService.setActive("series");

        // Create a new sr object
        $scope.sr = {
            name: "",
            config: {
                hierarchy: []
            }
        };
        $scope.propsTiers = [];
        NavService.setSeries($scope.sr);

        /**
        * Make a custom URL
        * @param {int} arg1 id Series
        * @param {int} arg2 id Page
        * @return location path
        */
        $scope.redirect = function (idSeries, idPage) {
            var path = "/page";
            if (idPage != null) {
                // We know idPage: edit the page.
                path = "page/" + idSeries + "/edit/" + idPage;
            } else {
                // We have no idPage, so add a new page.
                path = "page/" + idSeries + "/add";
            }
            //console.log(path)
            $location.path(path);
        }


        //// Series Properties
        //$scope.openProps = function () {
        //    $scope.propsOpen = !$scope.propsOpen;
        //    if ($scope.propsOpen) {
        //        $scope.propsTiers = [];
        //        // Note: propsTiers holds objects, each with a name and id.  It's not that we actually use the ID,
        //        // but databinding wasn't accurate when I simplified this array to just strings.
        //        for (var i = 0; i < $scope.sr.config.hierarchy.length; i++) {
        //            $scope.propsTiers.push({ id: i, name: $scope.sr.config.hierarchy[i] });
        //        }
        //    }
        //}

        $scope.cancelProps = function () {
            $scope.propsOpen = false;
            // TODO: if we're using this to create a series we'll need to do more.
        }

        $scope.addTier = function () {
            $scope.propsTiers.push({ id: $scope.propsTiers.length })
        }

        $scope.removeTier = function (idx) {
            if (idx < 0 || idx >= $scope.propsTiers.length)
                return;
            var o = $scope.propsTiers.splice(idx, 1);
            console.log("Removed element " + idx + " from tiers.  " + o.length + " gone, " + $scope.propsTiers.length + " left.");
        }

        // TODO: a method to cancel this series we were creating, e.g if the user hits a cancel button

        $scope.saveProps = function () {
            // Actually save the edited properties
            var sr = $scope.sr;
            var deleted = 0;
            sr.config["header-url"] = $scope.propsHeaderURL;
            sr.config.created = $nd.createEpochTime();
            sr.config.updated = 0; 
            sr.config.hierarchy = [];
            sr.config.deleted = deleted;
            for (var i = 0; i < $scope.propsTiers.length; i++) {
                sr.config.hierarchy.push($scope.propsTiers[i].name);
            }
            // TODO: message that we're saving?
            SeriesService.save(sr, function (success) {
                // sr is the _new_ metadata.  Save it into the model when we know it's been written to the database.
                $scope.sr = sr;
                $scope.propsOpen = false; // Close the series properties.
                // TODO: an MVC-friendly way of displaying this message
                alert("Success save data");
                $location.path("/");
            }, function (error) {
                // properties stay open in case there's something the user can fix.  They can cancel changes if necessary.
                // TODO: an MVC-friendly way of displaying this message
                alert("error, please try again");
            });
        }
    });
