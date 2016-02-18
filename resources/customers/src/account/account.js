angular.module('app.account', [
	'ngResource'
])
	.factory('Account', Account)
  



function Account(User, $auth, $uibModal) {
	var ret = {};

  // This function reloads the currently logged in user
  ret.load = function() {
  	if(!ret.isAuthenticated()) {
  		return;
  	}
    ret.user = User.findById({ id: 'me' }, function(v) {
      ret.user = v;
      if(!v.realm) {
        $uibModal.open({
          animation: true,
          templateUrl:'partials/realmDialog.html',
          controller: RealmDialog,
          size: 'sm',
          resolve: {
            user: function () {
              return v;
            }
          }
        });
      }
    });
  };

  //Check login
  ret.isAuthenticated = function() {
  	return $auth.isAuthenticated();
  }

  ret.changePassword = function(data) {
    return User
    .changePassword({id: this.user.id}, data)
    .$promise;
  },

  // User logout
  ret.logout = function() {
  	User.logout().$promise.then(function(res) {
      $auth.logout();
    });
  }

  ret.load();

  return ret;
}


function RealmDialog($scope, user, $uibModalInstance, User) {
  $scope.save = function() {
    User.prototype$updateAttributes({id:user.id}, $scope.user);
    $uibModalInstance.dismiss('cancel');
  }
}