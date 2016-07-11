'use strict';

/**
 * @ngdoc function
 * @name nanodesuApp:controller:PageEditCtrl
 * @description
 * Controller of the nanodesuApp
 */

angular.module('nanodesuApp')
    .controller('PageEditCtrl', function($scope, $routeParams, $location, /* TODO: remove SeriesService, */ PageService){
        //var auth = 'nano';
        //var hierarchy;
        var idSeries = $routeParams.idSeries;
        var idPage = $routeParams.idPage;
        //var metaTemp = new Object();
        //$scope.config = true;
        //$scope.main = false;
            
        ///**
        //* redirect into page URL
        //*/
        //$scope.redirect = function(){
        //    var path = "/page";
        //    $location.path(path);
        //}
        
        //$scope.back = function(){
        //    $scope.config = true;
        //    $scope.main = false;
        //}

        //$scope.next = function(){
        //    $scope.config = false;
        //    $scope.main = true;
        //}

        //get configuration of hierarchy from series  (removed; this is the old way)
        //$scope.series = SeriesService.get({'id': idSeries}, function(events){
        //    hierarchy = events.config.hierarchy;
        //});

        //page data schema from single-page PageService.get:
        //    {
        //        "page": {
        //            "meta": {
        //                "Volume": "1",
        //                "Chapter": "1",
        //                "title": "Natsume Sōseki, Sōseki’s Complete Collection, new edition (Iwanami Shoten)",
        //                "status": "1"
        //            },
        //            "series": "57788d46456e6cf036dd1492",
        //            "content": "## Chapter One: Natsume Sōseki, Sōseki’s Complete Collection, new edition ....",
        //            "id": "57788e6b456e6cf036dd1493"
        //        },
        //        "series": [
        //          {
        //              "config": { "hierarchy": [ "Volume", "Chapter" ] },
        //              "name": "Biblia",
        //              "id": "57788d46456e6cf036dd1492"
        //          }
        //        ]
        //    }

        //get page data
        PageService.get({ 'id': idPage },
            function (data) { // Success: we're passed the data that was received.
                $scope.pg = data.page;
                if (data.series && data.series.length > 0)
                    $scope.sr = data.series[0]; // First and only series in the array. Save it in the model.
                simplemde.value($scope.pg.content);

                // Assertions of data consistency.
                // Assert that idSeries matches up with the series IDs from the page data and its series info.
                $nd.assert($scope.pg.series && $scope.pg.series === idSeries, "$scope.pg.series && $scope.pg.series !== idSeries");
                $nd.assert($scope.sr.id && $scope.sr.id === idSeries, "$scope.sr.id && $scope.sr.id === idSeries");
                // Assert that the id of the page we received matches the page we requested.
                $nd.assert($scope.pg.id && $scope.pg.id === idPage, "$scope.pg.id && $scope.pg.id === idPage");
            }, function (error) {
                $nd.warn("PageService error on load! " + error.toString());
                // TODO: error handling for the applciation
            });

        /**
        * get value from hierarchy like volume, part, etc
        */
        $scope.hrValue = function (param) {
            return metaTemp[param];
        };

        ///**
        //* This function is active when save button clicked
        //* PUT the data into API server (replace old content and properties of the page/chapter)
        //*/
        // TODO: replace the workings of this.
        //$scope.save = function(){
        //    var title = $('#title').val();
        //    var content = simplemde.value();
        //    var id = $('#idPage').val();
        //    var status = $('#status').val();
        //    var meta = new Object();
        //    var data = new Object();

        //    angular.forEach(hierarchy, function(item){
        //        var key = item;
        //        meta[key] = $('#'+item).val();
        //    });
        //    meta.title = title;
        //    meta.status = status;

        //    data.content = content;
        //    data.meta = meta;

        //    PageService.update({id: idPage}, data, function(success){
        //        alert("success")
        //    }, function(error){
        //        //console.log(error.status)
        //    });
        //    //console.log(data)
        //}

        $scope.save = function () {
            // If needed, finish editing properties.
            if ($scope.openProps) {
                $scope.saveProps();
            }

            // Construct the page data that we'll save.
            var newData = new Object();
            newData.meta = angular.copy($scope.pg.meta);
            newData.content = simplemde.value();

            // (async) save it.
            PageService.update({ id: idPage }, newData, function (status) {
                // If the save (PUT) succeeds, we're done.  Navigate to the containing series' page.
                $location.path("/series/" + idSeries);
            }, function (err) {
                $nd.warn("Page Edit: update failed for series " + sr.name + ", page " + idPage);
                // TODO: proper user notification of failure
                alert("Page Edit: update failed for page data");
            });
        };
        
        // Page Properties:
        $scope.openProps = function () { // Set up for editing the page's title etc.
            $scope.propsOpen = true;
            // initialize the page properties for editing--separate copy so the edits can be cancelled.
            $scope.propsTitle = $scope.pg.meta.title;
            $scope.propsStatus = $scope.pg.meta.status;
            $scope.propsHr = [];
            for (var i = 0; i < $scope.sr.config.hierarchy.length; i++) {
                // Build a working copy of the hierarchy.
                // N.B. Hierarchy from the series may change indepent of what was recorded with the page.
                // Because of that we show, edit, and save only hierarchy values for what the series uses.
                $scope.propsHr.push({
                    label: $scope.sr.config.hierarchy[i],
                    value: $scope.pg.meta[$scope.sr.config.hierarchy[i]]
                });
            }
        };

        $scope.cancelProps = function () { // Cancel editing of the page's title etc.
            $scope.propsOpen = false;
            // That should be all.  we can just abandon the "for edit" copies of the page props.
        };

        // End editing the page's title etc. and save results in the model.
        $scope.saveProps = function () {
            $scope.propsOpen = false;
            // TODO: Actually save props back into the model (not to DB). Reverse what openProps() did.
            $scope.pg.meta = {};
            $scope.pg.meta.title = $scope.propsTitle;
            $scope.pg.meta.status = $scope.propsStatus;
            for (var i = 0; i < $scope.propsHr.length; i++) {
                $scope.pg.meta[$scope.propsHr[i].label] = $scope.propsHr[i].value;
            }
        };
    });
