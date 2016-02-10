'use strict'

/**
 * @ngdoc overview
 * @name nanodesuApp
 * @description
 * # nanodesu translation editor
 *
 * Main module of the application
 */

angular
    .module('nanodesuApp', [
        'ngRoute',
        'ngTouch',
        'ngResource'
        ])
    .config(function ($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'partials/main.html',
                controller: 'HomeCtrl',
                //controllerAs: 'main'
            })
            .when('/about', {
                templateUrl: 'partials/about.html',
                controller: 'AboutCtrl',
                //controllerAs: 'about'
            })
            .when('/page', {
                templateUrl: 'partials/page.html',
                controller: 'PageCtrl',
                //controllerAs: 'page'
            })
            .when('/page/:idSeries/add', {
                templateUrl: 'partials/page_add.html',
                controller: 'PageAddCtrl',
            })
            .when('/page/:idSeries/edit/:idPage', {
                templateUrl: 'partials/page_edit.html',
                controller: 'PageEditCtrl',
            })
            .otherwise({
                redirectTo: '/'
            });
    });
