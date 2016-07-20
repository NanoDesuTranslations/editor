'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the nanodesuApp
 */

angular.module('nanodesuApp')
    .controller('AboutCtrl', function ($scope, NavService) {
        NavService.setActive("about");
    });
