(function() {
'use strict';

/**
 * @ngdoc service
 * @name nanodesuApp.service:SeriesService
 *
 * @description
 * Service for Series
 *
 */
angular.module('nanodesuApp')
    .service('SeriesService', function($log, $window, SeriesResources){

        /**
         * @ngdoc method
         * @name delete
         * @methodOf nanodesuApp.service:SeriesService
         * @description
         * perform soft delete for series
         *
         * @param {string} seriesId
         */
        this.delete = function(seriesId) {
            $log.debug('SeriesService: perform soft delete on series');

            var deleted = true;

            SeriesResources.get({id: seriesId}, function(success) {

                var series = success;

                series.config.deleted = deleted;
                series.$update();

                if(series.$resolved) {
                    $window.location.reload();
                }
            }, function(error) {});

        };


        /**
         * @ngdoc method
         * @name removeDeleted
         * @methodOf nanodesuApp.service:SeriesService
         * @description
         * remove deleted series from the list
         *
         * @param {array} list of all series
         * @return {array} list of all series without deleted series
         */
        this.removeDeleted = function(series) {
            $log.debug('SeriesService: remove series with deleted flag');
            $log.debug(series);

            var result = [];

            angular.forEach(
                series,
                function(param) {
                    if(!param.config.deleted) {
                        this.push(param);
                    }
                },
                result
            );

            return result;
        };

    });
})();
