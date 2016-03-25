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
        'ngResource',
        'ngCookies'
        ])
    .config(function ($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'app/home/views/main.html',
                controller: 'HomeCtrl',
                //controllerAs: 'main'
            })
            .when('/login', {
                templateUrl: 'app/login/views/login.html',
                controller: 'LoginCtrl',
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
                templateUrl: 'app/page/views/pageAdd.html',
                controller: 'PageAddCtrl',
            })
            .when('/page/:idSeries/edit/:idPage', {
                templateUrl: 'app/page/views/pageEdit.html',
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
