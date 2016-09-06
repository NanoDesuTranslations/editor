'use strict';

/**
 * @ngdoc function
 * @name nanodesuApp:controller:PageEditCtrl
 * @description
 * Controller of the nanodesuApp
 */

angular.module('nanodesuApp')
    .controller('PageEditCtrl', function($scope, $routeParams, $location, PageService, NavService){
        var idSeries = $routeParams.idSeries;
        var idPage = $routeParams.idPage;

        NavService.setActive("page");

        //page data schema from single-page PageService.get (updated 7/17):
        // TODO: update for meta field changes: hierarchy and status as numbers; optional path and order fields.
        /*
        {
    "page": {
        "meta": {
            "title": "created first goes second",
            "status": 2,
            "order": 2,
            "path": "",
            "Chapter": 2,
            "Part": 2
        },
        "series": "575bb13025598017708f8907",
        "content": "VOLUME 1\r\nAfterword\r\n... Actual Afterword continues on for a while",
        "id": "5768657cb2c71e0b41d8fe59"
    },
    "series": [{
        "config": {"hierarchy": [
            "Volume",
            "Part",
            "chapter"
        ]},
        "name": "Sasami-san",
        "id": "575bb13025598017708f8907"
    }]
}
        */

        var oMDE = null;
        function ensureMDE() {
            // This function does two things.
            // One: it breaks the rules by directly manipulating the DOM from an AngularJS controller.
            //    Sorry, couldn't find a way to avoid that.
            // Two: it allows delaying until the last possible moment the time when the SimpleMDE markdown
            //    editor is initialized.
            if (!oMDE) {
                oMDE = new SimpleMDE(document.getElementById("content"));
            }
            return oMDE;
        }

        //get page data
        PageService.get({ 'id': idPage },
            function (data) { // Success: we're passed the data that was received.
                $scope.pg = data.page;
                NavService.setPage(data.page);
                if (data.series && data.series.length > 0)
                    $scope.sr = data.series[0]; // First and only series in the array. Save it in the model.
                NavService.setSeries($scope.sr);
                ensureMDE().value($scope.pg.content);

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
        * get value from hierarchy e.g. volume, part, etc
        */
        $scope.hrValue = function (param) {
            return metaTemp[param];
        };

        $scope.save = function () {
            // If needed, finish editing properties.
            if ($scope.propsOpen) {
                $scope.saveProps();
            }

            // Construct the page data that we'll save.
            var newData = new Object();
            newData.meta = angular.copy($scope.pg.meta);
            newData.content = ensureMDE().value();

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
            $scope.propsOrder = $scope.pg.meta.order;
            $scope.propsPath = $scope.pg.meta.path;
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

            // Actually save props back into the model. Reverse what openProps() did.
            // (the save() method does the actual save to DB.)
            $scope.pg.meta = {};
            $scope.pg.meta.title = $scope.propsTitle;
            $scope.pg.meta.status = $nd.string2Int0($scope.propsStatus); // Force convert propsStatus to an int. 
            $scope.pg.meta.order = ( null != $scope.propsOrder ? $nd.string2Int0($scope.propsOrder) : null );
            $scope.pg.meta.path = $scope.propsPath;
            for (var i = 0; i < $scope.propsHr.length; i++) {
                $scope.pg.meta[$scope.propsHr[i].label] = $nd.string2IntIfInt($scope.propsHr[i].value);
            }
        };

    });
