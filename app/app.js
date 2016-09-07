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
        'ngAlertify'
        'ui.bootstrap'
        ])
    .config(function ($routeProvider, $compileProvider){
        // just use this on production
        $compileProvider.debugInfoEnabled(false);
        $compileProvider.commentDirectivesEnabled(false);
        $compileProvider.cssClassDirectivesEnabled(false);
        
        $routeProvider
            .when('/', {
                templateUrl: 'app/home/views/main.html',
                controller: 'HomeCtrl',
                //access: { requiredLogin: true }
                /*
                resolve: {
                    auth: function(AuthService,$location){
                        if(AuthService.isLogin()){
                            return AuthService.isLogin();
                        }else{
                            $location.path('/login');
                            alert("Failed");
                        }
                    }
                }*/
                //controllerAs: 'main'
            })
            .when('/login', {
                templateUrl: 'app/login/views/login.html',
                controller: 'LoginCtrl',
                //access: {requiredLogin: false}
            })
            .when('/about', {
                templateUrl: 'app/about/views/about.html',
                controller: 'AboutCtrl',
                //access: {requiredLogin: false}
                //controllerAs: 'about'
            })
            .when('/build', {
                templateUrl: 'app/generate/views/generate.html',
                controller: 'GenerateCtrl',
                //access: {requiredLogin: false}
                //controllerAs: 'about'
            })
            //.when('/page', {
            //    templateUrl: 'app/page/views/page.html',
            //    controller: 'PageCtrl',
            //    //access: {requiredLogin: true}
            //    //controllerAs: 'page'
            //})
            .when('/page/:idSeries/add', {
                templateUrl: 'app/page/views/pageAdd.html',
                controller: 'PageAddCtrl',
                //access: {requiredLogin: true}
            })
            .when('/page/:idSeries/edit/:idPage', {
                templateUrl: 'app/page/views/pageEdit.html',
                controller: 'PageEditCtrl',
                //access: {requiredLogin: true}
            })
            //.when('/series', {
            //    templateUrl: 'app/series/views/series.html',
            //    controller: 'SeriesCtrl',
            //    //access: {requiredLogin: true}
            //})
            .when('/series/add', {
                templateUrl: 'app/series/views/seriesNew.html',
                controller: 'SeriesNewCtrl',
                //access: {requiredLogin: true}
            })
            .when('/series/:idSeries', {
                templateUrl: 'app/series/views/seriesView.html',
                controller: 'SeriesViewCtrl',
                //access: {requiredLogin: true}
            })
            //.when('/series/edit/:idSeries', {
            //    templateUrl: 'app/series/views/seriesEdit.html',
            //    controller: 'SeriesEditCtrl',
            //    //access: {requiredLogin: true}
            //})
            .otherwise({
                redirectTo: '/'
            });
    });
    /*
    .run(function($rootScope, $location, AuthService){
        $rootScope.$on("$routeChangeStart", function(event, next, current) {
            if(next.access.requiredLogin && AuthService.isLogin() == false){
                $location.path('/login');
            }
        });
    });
    */
