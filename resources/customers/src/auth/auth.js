angular.module('app.auth', [
	'satellizer'
])
  /**
   * @ngInject
   */
  .config(function($authProvider) {
    $authProvider.baseUrl = '/';
    $authProvider.loginUrl = '/api/users/login';
    $authProvider.signupUrl = '/api/users';
    $authProvider.tokenName = 'access_token';
    $authProvider.authToken = '';


    $authProvider.facebook({
      url: '/auth/facebook/callback',
      clientId: 1115887685128080,
      redirectUri: window.location.origin + '/',
    });
  });
    