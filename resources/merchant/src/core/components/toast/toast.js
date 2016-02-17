/**
  * @ngdoc module
  * @name app.components.toast
  * @description
  * Toast
  */
angular.module('core.components.toast', [])
	.provider('toast', ToastProvider);
	
	
/**
 * @ngInject
 */
function ToastProvider() {
	this.$get = function($mdToast) {
		$mdToast.notify = function(type, message, delay) {
			$mdToast.show({
					template: '<md-toast class="md-toast ' + type +'">' + message + '</md-toast>',
					hideDelay: delay || 3000,
					position: 'right'
			});
		};
		$mdToast.success = function(message, delay) {
			this.notify('success', message, delay);
		};
		$mdToast.error = function(message, delay) {
			this.notify('error', message, delay);
		};
		$mdToast.warning = function(message, delay) {
			this.notify('warning', message, delay);
		};
		return $mdToast;
	}
}