'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:controller:SeriesViewCtrl
 * @description
 * # SeriesViewCtrl
 * Controller of the nanodesuApp
 */

angular.module('nanodesuApp')
    .controller('SeriesViewCtrl', function ($scope, $routeParams, $location, PageService, SeriesService) {
        //$scope.series = SeriesService.query(function (success) {
        //    //console.log(success);
        //}, function (error) {
        //    //console.log(error);
        //});

        var idSeries =  $routeParams.idSeries;

        SeriesService.get({id: idSeries}, function(sr){
            $scope.sr = sr;
            console.log("series get success for "+sr.name);
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
                path = "page/" + idSeries + "/edit/" + idPage;
            } else if (idPage == null) {
                path = "page/" + idSeries + "/add";
            }
            //console.log(path)
            $location.path(path);
        }

        ///**
        //* This function is to close modal pages after click button
        //*/
        //$scope.refresh = function () {
        //    //$scope.series = null;
        //    $route.reload();
        //}

        //$scope.update = function () {
        //    $scope.show = true;
        //}

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
    });
