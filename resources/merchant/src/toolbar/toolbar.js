angular.module('app.toolbar', [
	'app.auth',
  'app.account',
	'ui.bootstrap',
	'core.components.toast'
])
  .controller('ToolbarCtrl', ToolbarCtrl);

/**
 * @ngInject
 */
function ToolbarCtrl($scope, $uibModal, Account, $location) {
    $scope.auth = Account.user;
	  $scope.isAuthenticated = function() {
      return Account.isAuthenticated();
    };
    $scope.logout = function() {
      Account.logout();
    	$location.path('/');
    }

    $scope.login = function() {
  		$uibModal.open({
  			animation: true,
  			templateUrl:'partials/loginDialog.html',
        		controller: LoginDialogCtrl,
  			size: 'sm',
  		});
    }
}


function SignupDialogCtrl($scope, $uibModal, $auth, toast, $uibModalInstance, $location) {
    $scope.signup = function() {
      $auth.signup($scope.user)
        .then(function(response) {
          $location.path('/');
          toast.success('You have successfully created a new account and have been signed-in');
          $scope.login();
        })
        .catch(function(response) {
          toast.error(response.data.error.message);
        });
    };
    
	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	}
	
	$scope.login = function() {
			$scope.cancel();
			$uibModal.open({
				animation: true,
				templateUrl:'partials/loginDialog.html',
	      controller: LoginDialogCtrl,
				size: 'sm',
			});
    }
}

function LoginDialogCtrl($scope, $uibModal, $auth, toast, $uibModalInstance, $state, Account, User, $http) {
    $scope.login = function() {
      $scope.errors = [];
      $auth.login($scope.user)
        .then(function(res) {
          toast.success('You have successfully signed in!');
          $scope.cancel();
          $auth.setToken(res.data.id);
          Account.load();
          $state.go('home');
        })
        .catch(function(error) {
        	$scope.errors = error.data.error;
        });
    }
    
    $scope.authenticate = function(provider) {
      window.location = '/auth/'+ provider;
    }
      
		$scope.cancel = function() {
			 $uibModalInstance.dismiss('cancel');
		}
		
    $scope.signup = function() {
			$scope.cancel();
			$uibModal.open({
				animation: true,
				templateUrl:'partials/signupDialog.html',
	      controller: SignupDialogCtrl,
				size: 'sm',
			});
    }
}
