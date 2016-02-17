angular.module('app.home', [
	'satellizer',
	'ui.bootstrap',
	'core.components.toast'
])
  /**
   * @ngInject
   */
  .config(Config);


function Config($stateProvider, $urlRouterProvider) {
	// Use $stateProvider to configure your states.
	$stateProvider
    .state('home', {
      url: "/",
      templateUrl: "home/index.html",
      controller: HomeCtrl,
    })
}



function HomeCtrl($scope, Card, Payment, $state) {

}