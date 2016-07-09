'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:service:AuthService
 * @description
 * # AuthService
 * Service for page of the nanodesuApp
 */

angular.module('nanodesuApp')
    .factory('AuthService', function($http,$cookies){
        var auth = {}

        auth.login = loginToken;
        auth.logout = logout;
        auth.isLogin = isLogin;
        auth.userName = userName;
        //auth.register = register;

        /**
        //private functions
        function handleSuccess(res){
            return res.data;
        }

        function handleError(error){
            return function(){
                return { success: false, message: error };
            }
        }
        */

        //// Temp - not used, in favor of login using the "token" cookie.
        function login(username, password){
            //return $http.post('/login',data).then(handleSuccess, handleError('login failed'));
            var status;
            if(username == "nano" || username == "sora" || username == "admin"){
                alert('success');
                status = true;
            }else{                
                alert('failed');
                status = false;
            }
            return status;
        }

        //// Temp - token cookie being used until real auth is implemented
        function loginToken(tokenValue) {
            $cookies.put('token', tokenValue);
        }

        function isLogin() {
            //// Temp - not used, in favor of login using the "token" cookie.
            //var login;
            //if($cookies.get('auth')){
            //    login = true;
            //}else{
            //    login = false;
            //}
            //return login;

            //// Temp - 'token' cookie being used until real auth is implemented.
            var status
            if ($cookies.get('token')) {
                status = true;
            } else {
                status = false;
            }
            return status;
        }

        function logout(){
            //// Temp - not used, in favor of login using the "token" cookie.
            // $cookies.remove('auth');
            //// Temp - 'token' cookie being used until real auth is implemented.
            $cookies.remove('token');
        }

        function userName() {
            //// Temp - 'token' cookie being used until real auth is implemented.
            //// (in this case there's no implementation for "auth" cookie)
            return ($cookies.get("token") ? $cookies.get("token") : "");
        }

        return auth;
    });
