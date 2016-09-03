'use strict';

/**
 * @ngdoc function
 * @name nanodesuApp:controller:PageAddCtrl
 * @description
 * Controller of the nanodesuApp
 */

angular.module('nanodesuApp')
    .controller('PageAddCtrl', function($scope, $routeParams, $location,  SeriesService, PageService, NavService){
        var idSeries = $routeParams.idSeries;

        NavService.setActive("page");

        // TODO: update for meta field changes: hierarchy and status as numbers; optional path and order fields.
        //page data schema from single-page PageService.get:
        //        "page": {
        //            "meta": {
        //                "title": "created first goes second",
        //                "status": 2,
        //                "order": 2,
        //                "path": "",
        //                "Chapter": 2,
        //                "Part": 2
        //            },
        //            "series": "57788d46456e6cf036dd1492",
        //            "content": "## Chapter One: Natsume Sōseki, Sōseki’s Complete Collection, new edition ....",
        //            "id": "57788e6b456e6cf036dd1493"
        //        },



        // Construct mock (empty) page data
        $scope.pg = {
            page: {
                meta: {
                    title: "",
                    status: "3"
                }
            }
        };
        NavService.setPage($scope.pg);

        // Model data for editing:
        $scope.propsTitle = "";
        $scope.propsStatus = 0; // Default to Draft for new pages.  Status >= 1 would be Publish.
        // propsOrder is undefined for new page.
        $scope.propsHr = [];
        $scope.propsPath = "";

        // old code: get this info via the NavService; the series for this new page should be the one currently active.
        // get configuration of hierarchy from series
        //SeriesService.get({ 'id': idSeries }, function (response) {
        //    $scope.sr = response;
        //});
        $scope.sr = NavService.getSeries();
        {   // local block of code
            var hierarchy = $scope.sr.config.hierarchy;
            for (var i = 0; i < hierarchy.length; i++) {
                $scope.propsHr.push({
                    label: hierarchy[i],
                    value: ""
                });
            }
        }

        $scope.save = function () {
            // Construct the page data that we'll save.
            var newData = new Object();
            newData.meta = angular.copy($scope.pg.meta);
            newData.series = idSeries;

            // Save the page we created.
            PageService.save(newData, function (status) {
                // If the save (POST) succeeds, we've only created the page, not the content.  Navigate to
                // the URL for editing the page we've just created.
                $location.path("/page/" + idSeries + "/edit/" + status.id);
            }, function (err) {
                $nd.warn("Page Add: save failed for series " + sr.name + ", new page.");
                // TODO: proper user notification of failure
                alert("Page Add: save failed for new page.");
            });
        };
        //$nd.warn("Running pageAddCtrl 3");

        $scope.cancelProps = function () {
            // Just abandon the form and return to the series it's part of.
            NavService.setPage(null);
            $location.path("/series/" + idSeries);
        }

        $scope.saveProps = function () {
            // TODO: validate the page information

            // put edited data into the model.
            $scope.pg.meta = {};
            $scope.pg.meta.title = $scope.propsTitle;
            $scope.pg.meta.path = $scope.propsPath;
            $scope.pg.meta.status = $nd.string2Int0($scope.propsStatus); // Force convert propsStatus to an int. 
            $scope.pg.meta.order = $nd.string2Int0($scope.propsOrder);
            for (var i = 0; i < $scope.propsHr.length; i++) {
                $scope.pg.meta[$scope.propsHr[i].label] = $scope.propsHr[i].value;
            }

            $scope.save(); // does the actual save.
        }

    });
