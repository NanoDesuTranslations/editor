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

        $locationProvider.html5Mode({
                'enabled':true,
                'requireBase': false
        });
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .run(function($rootScope, $location, AuthService){
        $rootScope.$on('$routeChangeStart', function(event, next, current){
            if(AuthService.isLogin() == false) {
                $location.path('login');
            }
        });
    });
})();
