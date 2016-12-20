(function() {
'use strict';

/**
 * @ngdoc overview
 * @name nanodesuApp
 *
 * @description
 * Nanodesu main routing
 */
angular
    .module('nanodesuApp', [
        'ngRoute',
        'ngTouch',
        'ngResource',
        'ngAlertify',
        'ui.bootstrap',
        'angularUtils.directives.dirPagination'
        ])
    .config(function ($routeProvider, $compileProvider, $logProvider, $locationProvider){
        // just use this on production
        //$compileProvider.debugInfoEnabled(false);
        //$logProvider.debugEnabled(false); // change to false in production

        //$locationProvider.html5Mode(true); need server side re-writing to avoid token invalid when refresh the page
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                resolve: {
                    auth: function($location, AuthService){
                        if(AuthService.isLogin()){
                            $location.path('/');
                        }
                    }
                }
            })
            .when('/users', {
                templateUrl: 'views/user.html',
                controller: 'UserCtrl'
            })
            .when('/users/add', {
                templateUrl: 'views/user_form.html',
                controller: 'UserAddCtrl'
            })
            .when('/users/edit/:username', {
                templateUrl: 'views/user_form.html',
                controller: 'UserAddCtrl'
            })
            .when('/projects', {
                templateUrl: 'views/project.html',
                controller: 'ProjectCtrl'
            })
            .when('/projects/add', {
                templateUrl: 'views/project_form.html',
                controller: 'ProjectAddCtrl'
            })
            .when('/projects/edit/:id', {
                templateUrl: 'views/project_form.html',
                controller: 'ProjectAddCtrl'
            })
            .when('/projects/list', {
                templateUrl: 'views/project_list.html',
                controller: 'ProjectListCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .run(function($rootScope, $location, AuthService){
        $rootScope.$on('$routeChangeStart', function(event, next, current){
            if(AuthService.isLogin() === false) {
                $location.path('/login');
            }
        });
    });
})();
