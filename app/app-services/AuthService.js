'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:service:AuthService
 * @description
 * # AuthService
 * Service for page of the nanodesuApp
 */

angular.module('nanodesuApp')
    .factory('AuthService', function($http,$cookies, $log){
        var auth = {}; // The object we're building.
        var un = "";   // local variable, for remembering the user's name.
        // The other thing we store is a token in the 'token' cookie, which will actually be used for authentication.

        // auth.login = loginToken;
        auth.login = login;
        auth.logout = logout;
        auth.isLogin = isLogin;
        auth.userName = userName;
        //auth.register = register;

        // Login:

        // Example of a successful response:
        //{
        //    "permissions": {
        //        "view": [],
        //       "edit": [],
        //        "admin": true
        //    },
        //    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImRlbW8iLCJwZXJtaXNzaW9ucyI6eyJ2aWV3IjpbXSwiZWRpdCI6W10sImFkbWluIjp0cnVlfSwiY3JlYXRlZCI6MTQ2ODMxMDQ1OTQ3MH0.Gsn5x0mzrtZ4DTfcn1sXjzG1H3SJKneNvba5qOegv9U"
        //}

        //private functions
        function handleSuccess(res){
            $log.info("auth login handle Success");
            $cookies.put("token", res.data.token);
            un = res.config.data.username;
            return res.data;
        }

        function handleError(error){
            return function(){
                $log.warn("auth login handle error " + message);
                return { success: false, message: error };
            }
        }
        

        //// Temp - not used, in favor of login using the "token" cookie.
        function login(username, password){
            // construct POST data.
            var data = { 'username' : username, 'password': password };
            $log.info("auth login making request");
            return $http.post('/user/login',data).then(handleSuccess, handleError('login failed'));
            //var status;
            //if(username == "nano" || username == "sora" || username == "admin"){
            //    alert('success');
            //    status = true;
            //}else{                
            //    alert('failed');
            //    status = false;
            //}
            //return status;
        }

        function logout(){
            // 'token' cookie stores the token and is accessible only from this domain.
            $cookies.remove('token');
            un = "";
        }

        // Reporting status for other components:

        function isLogin() {
            //  'token' cookie exists only while we're logged in.
            var status
            if ($cookies.get('token')) {
                status = true;
            } else {
                status = false;
            }
            return status;
        }

        function userName() {
            return un;
        }

        return auth;
    });
