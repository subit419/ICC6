angular.module('starter')
.config(['$stateProvider', '$urlRouterProvider', 'USER_ROLES',
function($stateProvider, $urlRouterProvider,USER_ROLES) {
  $stateProvider
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'LoginCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        data: {
              authorizedRoles: [USER_ROLES.all, USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.guest, USER_ROLES.team_member, USER_ROLES.owner, USER_ROLES.manager, USER_ROLES.supervisor]
        }
      }
    } 
  })
    .state('app.schedule', {
    url: '/schedule',
    views: {
      'menuContent': {
        templateUrl: 'templates/schedule.html',
        data: {
              authorizedRoles: [USER_ROLES.all, USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.guest, USER_ROLES.team_member, USER_ROLES.owner, USER_ROLES.manager, USER_ROLES.supervisor]
        }
      }
    } 
  })
  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl',
      }
    } 
  })
  .state('app.state2', {
      url: "/state2",
      views: 
      {
        'menuContent': 
          {
            templateUrl: "templates/state2.html",
            data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
                  }
          }
      }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html',
          data: {
              authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.owner]
          }
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl',
          data: {
              authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.owner]
          }
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl',
        data: {
                  authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.owner]
                    }
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/search');
}]);