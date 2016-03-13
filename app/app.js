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
                templateUrl: 'partials/pages/page.html',
                controller: 'PageCtrl',
                //controllerAs: 'page'
            })
            .when('/page/:idSeries/add', {
                templateUrl: 'partials/pages/pageadd.html',
                controller: 'PageAddCtrl',
            })
            .when('/page/:idSeries/edit/:idPage', {
                templateUrl: 'partials/pages/pageedit.html',
                controller: 'PageEditCtrl',
            })
            .when('/series', {
                templateUrl: 'partials/series/series.html',
                controller: 'SeriesCtrl',
            })
            .otherwise({
                redirectTo: '/'
            });
    });
