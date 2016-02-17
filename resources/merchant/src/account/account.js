angular.module('app.account', [
	'ngResource'
])
	.factory('Account', Account);



function Account(User, $auth, $cookies) {
	var ret = {};

	// set token
	var access_token= $cookies.get('access_token');
	if(access_token){
		$auth.setToken(access_token);
	}

  // This function reloads the currently logged in user
  ret.load = function() {
  	if(!ret.isAuthenticated()) {
  		return;
  	}
    ret.user = User.findById({ id: 'me' }, function(v) {
      ret.user = v;
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
  	$cookies.remove('access_token');
  	User.logout();
  	$auth.logout();
  }

  ret.load();

  return ret;
}
