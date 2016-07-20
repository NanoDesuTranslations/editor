(function () {
    'use strict';

    angular
      .module('nanodesuApp')
      .factory('NavService', NavService);

    function NavService($location) {
        var service = {
            setSeries: setSeries,
            getSeries: getSeries,
            hasSeries : hasSeries,
            setPage: setPage,
            getPage: getPage,
            hasPage : hasPage,
            clearAll: clearAll,

            gotoPage: gotoPage,
            gotoSeries: gotoSeries,
            setActive: setActive,
            curActive: curActive
        };

        // Store data about the currently-active series and page.  Storing the series in particular should
        // simplify creating pages and accessing series info while working on pages.
        var activeSr = null; // object for remembering active Series, if any.
        var activePg = null; // similarly, object for remembering active page if any.

        function setSeries(sr) {
            if (sr) {
                activeSr = angular.copy(sr);
            } else {
                activeSr = null;
            }
            return activeSr;
        }

        function getSeries() {
            return activeSr;
        }

        function hasSeries() {
            return !!activeSr;
        }

        function setPage(pg) {
            if (pg) {
                activePg = {  // copying selected data to avoid duplicating the page content.
                    // potential drawback: this may need to be updated if page schema changes.
                    meta: angular.copy(pg.meta),
                    series: pg.series,
                    id: pg.id
                };
            } else {
                activePg = null;
            }
            return activePg;
        }

        function getPage() {
            return activePg;
        }

        function hasPage() {
            return !!(activePg);
        }

        function clearAll() {
            activePg = activeSr = null;
        }

        function gotoSeries(idSeries) {
            if (!idSeries && activeSr && activeSr.id) {
                idSeries = activeSr.id;
            }
            if (idSeries) { // navigate to the page that opens that series.
                // TODO: discard the page if we switched series
                $location.path("/series/" + idSeries);
            } else {
                // Shouldn't happen. No series provided and no series currently active.  Go home, I guess.
                $location.path("/");
            }
        }

        function gotoPage(idPage) {
            $nd.assert(activeSr && activeSr.id, "Navigating to a page without an active Series!");
            if (!idPage && activePg && activePg.id) {
                idPage = activePg.id;
            }

            if (idPage) {
                $location.path("/page/" + activeSr.id + "/edit/" + idPage);
            } else {
                // Shouldn't happen. No page provided and no page currently active.  Go to the currently active series.
                gotoSeries();
            }
        }

        var sCurActive = ""; // Recorded name of the currently active type of page.
        function setActive(sName) {
            sCurActive = sName;
        }

        function curActive() {
            return sCurActive;
        }

        return service;
    }
})();
