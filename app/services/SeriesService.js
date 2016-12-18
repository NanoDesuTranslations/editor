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
    .service('SeriesService', function($log, alertify, ApiService){
        var uri = '/series';

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
            ApiService.setUrl(uri);

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
        }

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
            ApiService.setUrl(uri);

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
        }
    });
})();
