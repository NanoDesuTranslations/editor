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

        auth.login = login;
        auth.logout = logout;
        auth.isLogin = isLogin;
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

        function login(username, password){
            //return $http.post('/login',data).then(handleSuccess, handleError('login failed'));
            var status;
            if(username == "admin" && password == "admin"){
                alert('success');
                status = true;
            }else{                
                alert('failed');
                status = false;
            }
            return status;
        }

        function isLogin(){
            var login;
            if($cookies.get('auth')){
                login = true;
            }else{
                login = false;
            }
            return login;
        }

        function logout(){
            $cookies.remove('auth');
        }

        return auth;
    });
