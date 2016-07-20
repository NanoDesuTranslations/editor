'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:controller:SeriesViewCtrl
 * @description
 * # SeriesViewCtrl
 * Controller of the nanodesuApp
 */

angular.module('nanodesuApp')
    .controller('SeriesViewCtrl', function ($scope, $routeParams, $location, PageService, SeriesService, NavService) {

        var idSeries =  $routeParams.idSeries;

        NavService.setActive("series");

        SeriesService.get({id: idSeries}, function(sr){
            $scope.sr = sr;
            NavService.setSeries(sr);
            console.log("series get success for " + sr.name);
        }, function (error) {
            console.log("Series GET error"+error);
        })

        //query json data from api -- gets page head data regardless of series.
        PageService.query(function (success) {
            $scope.page = success.pages;
            //console.log(success)
        }, function (error) {
            //console.log(error)
        });

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

        /**
        * filter pages by id Series
        */
        $scope.pages = function (param) {
            //console.log(param)
            $scope.idSeries = param;
        }
        //$scope.page = PageService.get_page('nano').get({'id': '4'});

        $scope.delete = function (idPage) {
            PageService.delete({ id: idPage }, function (success) {
                console.log('success')
            }, function (error) {
                console.log(error)
            });
        }

        //// Series Properties
        $scope.propsOpen;

        $scope.openProps = function () {
            $scope.propsOpen = !$scope.propsOpen;
            if ($scope.propsOpen) {
                $scope.propsTiers = [];
                // Note: propsTiers holds objects, each with a name and id.  It's not that we actually use the ID,
                // but databinding wasn't accurate when I simplified this array to just strings.
                for (var i = 0; i < $scope.sr.config.hierarchy.length; i++) {
                    $scope.propsTiers.push({ id: i, name: $scope.sr.config.hierarchy[i] });
                }
            }
        }

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
            console.log("Removed element " + idx + " from tiers.  " + o.length + " gone, "+$scope.propsTiers.length+" left.");
        }

        $scope.saveProps = function () {
            var sr = $scope.sr;
            sr.config.hierarchy = [];
            for (var i = 0; i < $scope.propsTiers.length; i++) {
                sr.config.hierarchy.push($scope.propsTiers[i].name);
            }
            // TODO: message that we're saving?
            SeriesService.update({ id: idSeries }, sr, function (success) {
                // sr (param) is the new metadata.  Save it into the model when we know it's been written to the database.
                $scope.sr = sr;
                $scope.propsOpen = false; // Close the series properties.
                // TODO: an MVC-friendly way of displaying this message
                alert("Success save data");
            }, function (error) {
                // properties stay open in case there's something the user can fix.  They can cancel changes if necessary.
                // TODO: an MVC-friendly way of displaying this message
                alert("error, please try again");
            });
        }
    });
