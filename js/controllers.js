angular.module('starter')

.controller('LoginCtrl', [ '$scope', '$state' , '$window', 'Auth', '$ionicHistory',
  function($scope, $state, $window, Auth, $ionicHistory) {
    console.log("Not french");
    $scope.credentials = {};
    $scope.loginForm = {};
    $scope.error = false;
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});


  // Create the login modal that we will use later
/*  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope,
    controller : "LoginCtrl"
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.showModal = function() {
    $scope.modal.show();
  };
*/
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.credentials);
    $scope.submitted = true;
        if (!$scope.loginForm.$invalid) {
            $scope.sendRequest($scope.credentials);
        } else {
            $scope.error = true;
            return;
        }
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
  };

  $scope.sendRequest = function(credentials) {
    $scope.error = false;
        Auth.login(credentials, function(user) {
            //success function
            $ionicHistory.nextViewOptions({
              disableBack: true
            });
            $state.go('app.search');
        }, function(err) {
            $scope.error = true;
            $scope.errorMessage ="error at send request";
        });
  }
  if ($window.sessionStorage["userInfo"]) {
      var credentials = JSON.parse($window.sessionStorage["userInfo"]);
      console.log($window.sessionStorage["userInfo"]);
      $scope.sendRequest(credentials);
  }

}])

// .controller('ScheduleCtrl', [ '$scope', '$state' , '$window', '$ionicHistory',
//   function($scope, $state, $window, Auth, $ionicHistory) {

// }])

.controller('ParentController', ['$scope', '$state', '$rootScope', 'Auth', 'AUTH_EVENTS','USER_ROLES', '$ionicHistory',
function($scope, $state,$rootScope, Auth, AUTH_EVENTS, USER_ROLES, $ionicHistory){
    // this is the parent controller for all controllers.
    // Manages auth login functions and each controller
    // inherits from this controller    

    
    // $scope.modalShown = false;
    // var showLoginDialog = function() {
    //     if(!$scope.modalShown){
    //         $scope.modalShown = true;
    //         var ModalInstance = $uibModal.open({
    //             templateUrl : 'templates/login.html',
    //             controller : 'ParentController',
    //             backdrop : 'static',
    //         });

    //         modalInstance.result.then(function() {
    //             $scope.modalShown = false;
    //         });
    //     }
    // };
    // $scope.closeLogin = function() {
    //   $modal.hide();
    // };
    // $scope.closeModal = function () {
    //     $scope.uibModalInstance.dismiss('cancel');
    // };
    console.log("In Controllers Parent Conntroller");
    var setCurrentUser = function(){
        $scope.currentUser = $rootScope.currentUser;
    }

    /*$ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });*/

    /*$scope.showModal = function() {
       $scope.modal.show();
    };*/
    // console.log($scope);
    var showNotAuthorized = function(){
        alert("Not Authorized");
    }
    var goToLogin = function(){
      $ionicHistory.nextViewOptions({
              disableBack: true
            });
        $state.go('app.login');
    }
    
    $scope.currentUser = null;
    $scope.userRoles = USER_ROLES;
    $scope.isAuthorized = Auth.isAuthorized;
    console.log("auth.isauthorized: ",Auth.isAuthorized);

    //listen to events of unsuccessful logins, to run the login dialog
    //  function(){
    //   console.log("something");
    //   console.log($scope.showModal);
      
    // });
    $rootScope.$on(AUTH_EVENTS.notAuthorized, showNotAuthorized);
    $rootScope.$on(AUTH_EVENTS.notAuthenticated, goToLogin);
    $rootScope.$on(AUTH_EVENTS.sessionTimeout, goToLogin);
    $rootScope.$on(AUTH_EVENTS.logoutSuccess, goToLogin);
    $rootScope.$on(AUTH_EVENTS.loginSuccess, setCurrentUser);
    
}])


.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
