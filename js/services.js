'use strict';

angular.module('starter')
.factory('Auth', [ '$http', '$rootScope', '$window', 'Session', 'AUTH_EVENTS', 
function($http, $rootScope, $window, Session, AUTH_EVENTS) {
    var authService = {};
    
    
    //the login function
    // user is CREDENTIALS FROM FORM
    authService.login = function(user, success, error) {
        console.log("Running Login function");
        var settings = {    
                          "url": "http://localhost:8080/api/staff_login",
                          "method": "POST",
                          "headers": {
                            "content-type": "application/json"
                          },  
                          "data": {"staff_id":user.username,"password":user.password}

                        };


        $http(settings).success(function (response) {
        //$http.get('users.json').success(function(data) {
        //$http.post('users.json').success(function(data) {
        
        //this is my dummy technique, normally here the 
        //user is returned with his data from the db
        // if (response.data.valid){

        // }
        // user is off the form
        console.log("user",user);

        // var results = response.data.results;
        // users is from the data json
        console.log("response  ",response);
        //console.log("results:  ",results);
        if(response.valid){
            var loginData = {
                firstName:response.results[0].staff_first, 
                lastName:response.results[0].staff_last, 
                staffID:response.results[0].staff_id, 
                staffType:response.results[0].staff_type_id
            };

            $window.sessionStorage["userInfo"] = JSON.stringify(loginData);
            Session.create(loginData);
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            // $rootScope.currentUser = loginData;
            success(loginData);
        } else {
            //OR ELSE
            //unsuccessful login, fire login failed event for 
            //the according functions to run
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            error();
        }
        // if(users[user.username]){
        //     var loginData = users[user.username];
        //     console.log("loginData",loginData);
        //     //insert your custom login function here 
        //     if(user.username == loginData.username && user.password == loginData.username){
        //         //set the browser session, to avoid relogin on refresh
        //         $window.sessionStorage["userInfo"] = JSON.stringify(loginData);
                
        //         //delete password not to be seen clientside 
        //         delete loginData.password;
                
        //         //update current user into the Session service or $rootScope.currentUser
        //         //whatever you prefer
        //         Session.create(loginData);
        //         //or
        //         $rootScope.currentUser = loginData;
                
        //         //fire event of successful login
        //         $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        //         //run success function
        //         success(loginData);
        //     } else{
        //         //OR ELSE
        //         //unsuccessful login, fire login failed event for 
        //         //the according functions to run
        //         $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        //         error();
        //     }
        // }   
        });
        
    };

    //check if the user is authenticated
    authService.isAuthenticated = function() {
        return !!Session.staffID;
        console.log("not not jokes: ", !!Session.staffID);
    };
    
    //check if the user is authorized to access the next route
    //this function can be also used on element level
    //e.g. <p ng-if="isAuthorized(authorizedRoles)">show this only to admins</p>
    authService.isAuthorized = function(authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
          authorizedRoles = [authorizedRoles];
        }
        return (authService.isAuthenticated() &&
          authorizedRoles.indexOf(Session.staffType) !== -1);
    };
    
    //log out the user and broadcast the logoutSuccess event
    authService.logout = function(){
        Session.destroy();
        $window.sessionStorage.removeItem("userInfo");
        $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
    }

    return authService;
} ])

.factory('AuthInterceptor', [ '$rootScope', '$q', 'Session', 'AUTH_EVENTS',
function($rootScope, $q, Session, AUTH_EVENTS) {
    return {
        responseError : function(response) {
            $rootScope.$broadcast({
                401 : AUTH_EVENTS.notAuthenticated,
                403 : AUTH_EVENTS.notAuthorized,
                419 : AUTH_EVENTS.sessionTimeout,
                440 : AUTH_EVENTS.sessionTimeout
            }[response.status], response);
            return $q.reject(response);
        }
    };
} ])

.service('Session', function($rootScope, USER_ROLES) {

    this.create = function(user) {
    console.log("user role: ", user.staffType);
        this.user = user;
        this.staffID = user.staffID
        this.staffType = user.staffType;
    };
    this.destroy = function() {
        this.user = null;
        this.staffID = null;
        this.staffType = null;
    };
    return this;
});