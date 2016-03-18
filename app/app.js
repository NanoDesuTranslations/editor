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
                templateUrl: 'app/home/views/main.html',
                controller: 'HomeCtrl',
                //controllerAs: 'main'
            })
            .when('/about', {
                templateUrl: 'app/about/views/about.html',
                controller: 'AboutCtrl',
                //controllerAs: 'about'
            })
            .when('/page', {
                templateUrl: 'app/page/views/page.html',
                controller: 'PageCtrl',
                //controllerAs: 'page'
            })
            .when('/page/:idSeries/add', {
                templateUrl: 'app/page/views/pageadd.html',
                controller: 'PageAddCtrl',
            })
            .when('/page/:idSeries/edit/:idPage', {
                templateUrl: 'app/page/views/pageedit.html',
                controller: 'PageEditCtrl',
            })
            .when('/series', {
                templateUrl: 'app/series/views/series.html',
                controller: 'SeriesCtrl',
            })
            .otherwise({
                redirectTo: '/'
            });
    });
