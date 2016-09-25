'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:directive:LoaderDirective
 * @description
 * # LoaderDirective
 * Service for page of the nanodesuApp
 */

angular.module('nanodesuApp')
    .directive('ndLoading', function(){
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="loading"><img src="../assets/images/spin.gif" class="loading-image" /></div>',
        }
    });
