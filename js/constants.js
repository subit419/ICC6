angular.module('starter')

.constant('USER_ROLES', {
  all : '*',
  admin : 'A',
  owner : 'O',
  manager:'M',
  supervisor: 'S',
  team_member: 'T',
  editor : 'editor',
  guest : 'guest',
  loggedout: 'L'
})
.constant('AUTH_EVENTS', {
  loginSuccess : 'auth-login-success',
  loginFailed : 'auth-login-failed',
  logoutSuccess : 'auth-logout-success',
  sessionTimeout : 'auth-session-timeout',
  notAuthenticated : 'auth-not-authenticated',
  notAuthorized : 'auth-not-authorized'
})