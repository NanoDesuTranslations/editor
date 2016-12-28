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
    .service('SeriesService', function($log, $window, alertify, ApiService){

        /**
         * @ngdoc method
         * @name save
         * @methodOf nanodesuApp.service:SeriesService
         * @description
         * perform save for series
         *
         * @param {Object} series
         */
        this.save = function(series){
            $log.debug('SeriesService: save function');
            $log.debug(series);
            ApiService.setUrl($nd.series);

            ApiService.http().save(
                series,
                function(success){
                    $log.debug(success);
                    alertify.success('Success! New Project has been saved');
                },
                function(error){
                    $log.debug(error);
                    alertify.error('Error! Please Contact Admin');
                }
            );
        };

        /**
         * @ngdoc method
         * @name update
         * @methodOf nanodesuApp.service:SeriesService
         * @description
         * perform update for series
         *
         * @param {string} id
         * @param {Object} series
         */
        this.update = function(id, series){
            $log.debug('SeriesService: save function');
            $log.debug(series);
            ApiService.setUrl($nd.series);

            ApiService.http().update(
                {'id': id}, series,
                function(success){
                    $log.debug(success);
                    alertify.success('Success! Project has been updated');
                },
                function(error){
                    $log.debug(error);
                    alertify.error('Error! Please Contact Admin');
                }
            );
        };

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
            var deleted = true;
            ApiService.setUrl($nd.series);

            ApiService.http().get(
                {'id': seriesId},
                function(success){
                    $log.debug(success);
                    var series = success;
                    series.config.deleted = deleted;

                    ApiService.http().update(
                        {'id': seriesId},
                        series,
                        function(success){
                            $log.debug(success);
                            alertify.success('Success! Series with id: '+seriesId+'already deleted');
                            $window.location.reload();
                        },
                        function(error){
                            $log.debug(error);
                            alertify.error('Error! Please Contact Admin');
                        }
                    );
                },
                function(error){
                    $log.debug(error);
                    alertify.error('Error! Please Contact Admin');
                }
            );
        };
    });
})();
