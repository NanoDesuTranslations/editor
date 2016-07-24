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
        // TODO: these local variables are lost of the page is refreshed.  Store the info in a cookie?
        var un = "";   // local variable, for remembering the user's name.
        var fAdmin = false; // local variable for remembering user's permission level.
        // The other thing we store is a token in the 'token' cookie, which will actually be used for authentication.

        // auth.login = loginToken;
        auth.login = login;
        auth.logout = logout;
        auth.isLogin = isLogin;
        auth.userName = userName;
        auth.isAdmin = isAdmin;

        // Login:

        // Example of a successful response:
        //{
        //    "permissions": {
        //        "view": [<list of IDs>],
        //        "edit": [<list of IDs>],
        //        "admin": true/false
        //    },
        //    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImRlbW8iLCJwZXJta..."
        //}

        //private functions
        function handleSuccess(res){
            $log.info("auth login handle Success");
            $log.info("Auth info: " + JSON.stringify(res));
            $cookies.put("token", res.data.token);
            un = res.config.data.username;
            fAdmin = res.data.permissions.admin;
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
            fAdmin = false;
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

        function isAdmin() {
            return ! !fAdmin;
        }

        return auth;
    });
