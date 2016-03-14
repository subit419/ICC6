/**
 * Contains functions that are added to the root AngularJs scope.
 */
angular.module('starter')
.run(function($rootScope, $state, Auth, AUTH_EVENTS) {
    
    // before each state change, check if the user is logged in
    //and authorized to move onto the next state
    $rootScope.$on('$stateChangeStart', function (event, next) {
        console.log("Next: ", next);

        if (next.views.menuContent.data){
            

            var authorizedRoles = next.views.menuContent.data.authorizedRoles;
            console.log(Auth.isAuthorized(authorizedRoles));
            if (!Auth.isAuthorized(authorizedRoles)) {
                console.log("I want to sleep");
              event.preventDefault();
              console.log("I want to sleep 22222");
              if (Auth.isAuthenticated()) {
                console.log("I want to sleep 333");
                // user is not allowed
                $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
              } else {
                // user is not logged in
                console.log("I want to sleep 444");
                console.log(AUTH_EVENTS.notAuthenticated);
                $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);

              }
            }
        }
      });
    
    /* To show current active state on menu */
    $rootScope.getClass = function(path) {
        if ($state.current.name == path) {
            return "active";
        } else {
            return "";
        }
    }
    
    $rootScope.logout = function(){
        Auth.logout();
    };

});