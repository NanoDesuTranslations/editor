(function() {
'use strict';

/**
 * @ngdoc service
 * @name nanodesuApp.service:AuthService
 *
 * @description
 * Service for Authentication & Authorization
 * Example of a successful response
 * {
 *  'permissions': {
 *      'view': [<list of ids>],
 *      'edit': [<list of ids>],
 *      'admin': true/false
 *  },
 *  'token': 'eyJ0eXAiOiJKV1QiLChb....'
 * }
 */
angular.module('nanodesuApp')
    .service('AuthService', function($log, $window, alertify, ApiService){

        /**
         * @ngdoc method
         * @name setUsername
         * @methodOf nanodesuApp.service:AuthService
         * @description
         * set username into localStorage
         *
         * @param {string} username
         */
        this.setUsername = function(username) {
            localStorage.setItem('username', username);
        };

        /**
         * @ngdoc method
         * @name getUsername
         * @methodOf nanodesuApp.service:AuthService
         * @description
         * return username from localStorage
         *
         * @return {string} username
         */
        this.getUsername = function() {
            $log.debug('AuthService: getUsername function');
            var username = '';
            if(localStorage.getItem('username') !== null){
                username = localStorage.getItem('username');
            }
            return username;
        };

        /**
         * @ngdoc method
         * @name getToken
         * @methodOf nanodesuApp.service:AuthService
         * @description
         * return token from localStorage
         *
         * @return {string} token
         */
        this.getToken = function() {
            $log.debug('AuthService: getToken function');
            var token = '';
            if(localStorage.getItem('token') !== null){
                token = localStorage.getItem('token');
            }
            return token;
        };

        /**
         * @ngdoc method
         * @name getView
         * @methodOf nanodesuApp.service:AuthService
         * @description
         * return view from localStorage
         *
         * @return {string} view
         */
        this.getView = function() {
            $log.debug('AuthService: getView function');
            var view = [];
            if(localStorage.getItem('view') !== null){
                view = localStorage.getItem('view');
            }
            return view;
        };

        /**
         * @ngdoc method
         * @name getEdit
         * @methodOf nanodesuApp.service:AuthService
         * @description
         * return edit from localStorage
         *
         * @return {string} edit
         */
        this.getEdit = function() {
            $log.debug('AuthService: getEdit function');
            var edit = [];
            if(localStorage.getItem('edit') !== null){
                edit = localStorage.getItem('edit');
            }
            return edit;
        };

        /**
         * @ngdoc method
         * @name isAdmin
         * @methodOf nanodesuApp.service:AuthService
         * @description
         * return isAdmin or not from localStorage
         *
         * @return {boolean} admin
         */
        this.isAdmin = function() {
            $log.debug('AuthService: isAdmin function');

            var isAdmin = '';
            if(localStorage.getItem('isAdmin') !== null){
                // JSON.parse is use to convert from String into boolean http://stackoverflow.com/a/21285901/5852226
                isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
            }

            return isAdmin;
        };

        /**
         * @ngdoc method
         * @name renewPermissions
         * @methodOf nanodesuApp.service:AuthService
         * @description
         * renew localStorage data for view and edit permissions
         *
         * @param {Object} data that already put in the server
         */
        this.newPermissions = function(data){
            $log.debug('AuthService: renewPermissions function');
            $log.debug(data.permissions.view);
            removePermission();
            renewPermissions(data);
        };

        /**
         * @ngdoc method
         * @name isLogin
         * @methodOf nanodesuApp.service:AuthService
         * @description
         * return is login action success or not
         *
         * @return {boolean} true/false
         */
        this.isLogin = function() {
            $log.debug('AuthService: isLogin function');
            var status = '';
            if(localStorage.getItem('token')) {
                status = true;
            } else {
                status = false;
            }
            return status;
        };

        /**
         * @ngdoc method
         * @name storeCredentials
         * @methodOf nanodesuApp.service:AuthService
         * @description
         * private function to save some credentials on localStorage
         *
         * @param {Object} authorization info from API
         */
        this.storeCredentials = function(param) {
            $log.debug('AuthService: storeCredentials function');
            $log.debug('Authorization Info: '+JSON.stringify(param));
            localStorage.setItem('isAdmin', param.permissions.admin);
            localStorage.setItem('token', param.token);
            localStorage.setItem('view', param.permissions.view);
            localStorage.setItem('edit', param.permissions.edit);
        };

        /**
         * @ngdoc method
         * @name removeCredentials
         * @methodOf nanodesuApp.service:AuthService
         * @description
         * private function to delete data in localStorage
         *
         */
        this.removeCredentials = function() {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('view');
            localStorage.removeItem('edit');
        };

        /**
         * @ngdoc method
         * @name removePermission
         * @methodOf nanodesuApp.service:AuthService
         * @description
         * private function to delete view and edit permissions
         * in localStorage
         */
        function removePermission(){
            localStorage.removeItem('view');
            localStorage.removeItem('edit');
        }

        /**
         * @ngdoc method
         * @name renewPermissions
         * @methodOf nanodesuApp.service:AuthService
         * @description
         * private function to delete view and edit permissions
         * in localStorage
         *
         * @param {Object} user
         */
        function renewPermissions(data){
            localStorage.setItem('view', data.permissions.view);
            localStorage.setItem('edit', data.permissions.edit);
        }
    });
})();
