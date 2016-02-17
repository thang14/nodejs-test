angular
    .module('templates', []);
    
    
angular.module('app', [
    'templates',
    'ngResource',
    'ui.router',
    'ngMaterial',
    'app.home',
    'app.auth',
    'app.settings',
    'app.toolbar',
    'app.confirm',
    'app.payment',
    'lbServices',
    'ngCookies'
])
/**
 * @ngInject
 */
.config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
})
/**
 * @ngInject
 */
.run(function($rootScope, $state, $stateParams, $auth, Account, $cookies) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
	$rootScope.page = {
		title: "On.com | Shopping at home",
		description: "On.com | Shopping at home",
		keywords: "On.com | Shopping at home"
	};
});





