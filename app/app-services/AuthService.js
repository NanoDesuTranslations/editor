'use strict'

/**
 * @ngdoc function
 * @name nanodesuApp:service:AuthService
 * @description
 * # AuthService
 * Service for page of the nanodesuApp
 */

angular.module('nanodesuApp')
    .factory('AuthService', function($resource){
        return{
            login: function(username, password){
                if(username == 'admin' && password == 'admin'){
                    return "Success";
                }else{
                    return "Failed";    
                }
            },
            isLogin: function(param){
                var isLogin = param;
                return isLogin;
            },
            logout: function(){
            },
            register: function(){
            }
        }
    });
