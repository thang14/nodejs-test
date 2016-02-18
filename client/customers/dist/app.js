/*!
 * Test Application
 * v0.0.0
 */
(function(){
"use strict";

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
.config(["$urlRouterProvider", function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
}])
/**
 * @ngInject
 */
.run(["$rootScope", "$state", "$stateParams", "Account", "$location", function($rootScope, $state, $stateParams, Account, $location) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
	$rootScope.page = {
		title: "On.com | Shopping at home",
		description: "On.com | Shopping at home",
		keywords: "On.com | Shopping at home"
	};


    $rootScope.$on('$stateChangeStart', function (event, next) {
        if (next.requireLogin && !Account.isAuthenticated()) {
          $state.go('home');
        }
    });
}]);






})();
/*!
 * Test Application
 * v0.0.0
 */
(function(){
"use strict";

'use strict';
/**
 * @name            Onhanh
 * @description     Application Bootstrap File
 */
jQuery(document).ready(function() {
  window.angular.bootstrap(document, ['app']);
});
})();
/*!
 * Test Application
 * v0.0.0
 */
(function(){
"use strict";

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
Account.$inject = ["User", "$auth", "$uibModal"];


function RealmDialog($scope, user, $uibModalInstance, User) {
  $scope.save = function() {
    User.prototype$updateAttributes({id:user.id}, $scope.user);
    $uibModalInstance.dismiss('cancel');
  }
}
})();
/*!
 * Test Application
 * v0.0.0
 */
(function(){
"use strict";

angular.module('app.auth', [
	'satellizer'
])
  /**
   * @ngInject
   */
  .config(["$authProvider", function($authProvider) {
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
  }]);
    
})();
/*!
 * Test Application
 * v0.0.0
 */
(function(){
"use strict";

angular.module('app.card', [
  'ngResource'
])
  .factory('Card', Card);

function Card($resource) {
  var Card =  new $resource('/api/creditcards/:id', {id: "@id"}, {
      update: {method:'PUT'}
  });
  return Card;
}
Card.$inject = ["$resource"];

})();
/*!
 * Test Application
 * v0.0.0
 */
(function(){
"use strict";

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
Config.$inject = ["$stateProvider", "$urlRouterProvider"];



function HomeCtrl($scope, Card, Payment, $state) {

}
HomeCtrl.$inject = ["$scope", "Card", "Payment", "$state"];
})();
/*!
 * Test Application
 * v0.0.0
 */
(function(){
"use strict";

angular.module('core', [
	'core.components.toast',
	'core.components.geolocation'
]);
})();
/*!
 * Test Application
 * v0.0.0
 */
(function(){
"use strict";

angular.module('app.payment', [
  'ngResource'
])
  .factory('PaymentHistory', PaymentHistory)
  .factory('Payment', Payment);

function PaymentHistory($resource) {
  var PaymentHistory =  new $resource('/api/paymenthistory');
  return PaymentHistory;
}
PaymentHistory.$inject = ["$resource"];


function Payment($resource) {
  var Payment =  new $resource('/api/payment');
  return Payment;
}
Payment.$inject = ["$resource"];


})();
/*!
 * Test Application
 * v0.0.0
 */
(function(){
"use strict";

angular.module('app.settings', [
	'ngResource',
	'ui.router',
	'app.account',
	'app.card'
]);

})();
/*!
 * Test Application
 * v0.0.0
 */
(function(){
"use strict";

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
ToolbarCtrl.$inject = ["$scope", "$uibModal", "Account", "$location"];


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
      $auth.authenticate(provider).then(function(res) {
        Account.load();
        $scope.cancel();
      });
      
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

})();
/*!
 * Test Application
 * v0.0.0
 */
(function(){
"use strict";

angular.module('app.settings')
	.config(Config);


function Config($stateProvider) {
	$stateProvider

    .state('settings', {
      url: "/settings",
      templateUrl: "settings/settings.html",
      controller: SettingsCtrl,
      requireLogin: true,
    })
    .state('settings.account', {
      url: "/account",
      requireLogin: true,
      views: {
        "settings": {
          templateUrl: "settings/account.html",
      	  controller: AccountCtrl,
        }
      }
    })
    .state('settings.profile', {
      requireLogin: true,
      url: "/profile",
      views: {
        "settings": {
          templateUrl: "settings/profile.html",
          controller: ProfileCtrl,
        }
      }
    })
    .state('settings.creditcards', {
      url: "/creditcards",
      requireLogin: true,
      views: {
        "settings": {
          templateUrl: "settings/creditcards.html",
          controller: CreditcardsCtrl,
        }
      }
    })
    .state('settings.addresses', {
      url: "/addresses",
      requireLogin: true,
      views: {
        'settings': {
          templateUrl: "settings/addresses.html",
          controller: AddressesCtrl,
        }
      }
    })
    .state('settings.paymenthistory', {
      url: "/paymenthistory",
      requireLogin: true,
      views: {
        'settings': {
          templateUrl: "settings/paymenthistory.html",
          controller: PaymentHistoryCtrl,
        }
      }
    })
    .state('settings.orders', {
      url: "/orders",
      requireLogin: true,
      views: {
        'settings': {
          templateUrl: "settings/orders.html",
          controller: OrderCtrl,
        }
      }
    });
}
Config.$inject = ["$stateProvider"];


function OrderCtrl() {

}


function AccountCtrl($scope, Account, toast) {
  $scope.save = function() {
    $scope.errors = null;
    Account.changePassword($scope.account)
    .then(function() {
      toast.success('You have saved new password!');
    }).catch(function(error) {
      $scope.errors = error.data.error;
    });
  }
}
AccountCtrl.$inject = ["$scope", "Account", "toast"];

function SettingsCtrl() {
  console.log('----SettingsCtrl-----');
}

function ProfileCtrl($scope, Account, User) {
	$scope.profile = Account.user;
  $scope.save = function() {
     User.prototype$updateAttributes({id:$scope.profile.id}, $scope.profile);
  }
}
ProfileCtrl.$inject = ["$scope", "Account", "User"];

/**
 * CreditcardsCtrl
 * ------------------------------------------------------
 */
function CreditcardsCtrl($scope, Card, $uibModal) {
    $scope.cards = Card.query();
    
    $scope.add = function() {
		$uibModal.open({
			animation: true,
			templateUrl:'partials/dialogCardAdd.html',
            controller: DialogCardAddCtrl,
			size: 'sm',
				resolve: {
                cards: function () {
                  return $scope.cards;
                }
            }
		});
    }
    
    $scope.edit = function(card) {
        $uibModal.open({
			animation: true,
			templateUrl:'partials/dialogCardDetails.html',
            controller: DialogCardDetailsCtrl,
			size: 'sm',
			resolve: {
                item: function () {
                  return card;
                }
            }
		});
    }
    
    $scope.remove = function(card, toast) {
        var idx = $scope.cards.indexOf(card);
        $scope.cards.splice(idx, 1);
        card.$remove(function() {
            toast.success('Card had removed');
        });
    }
}
CreditcardsCtrl.$inject = ["$scope", "Card", "$uibModal"];

function DialogCardAddCtrl($scope, Card, $uibModalInstance, cards) {
    $scope.card = new Card();
    $scope.save = function() {
        $scope.card.$save(onSave.bind(this), onError.bind(this));
    }
    $scope.close = function() {
        $uibModalInstance.dismiss('cancel');
    }
    
   function onSave() {
      cards.push($scope.card);
      $scope.close();
    }
    
    function onError(err) {
      $scope.errors = err.data;
    }
}

function DialogCardDetailsCtrl($scope, item, $uibModalInstance) {
    $scope.card = item;
    $scope.save = function() {
        $scope.card.$update(onSave.bind(this), onError.bind(this));
    }
    $scope.close = function() {
        $uibModalInstance.dismiss('cancel');
    }
    
    function onSave() {
      $scope.close();
    }
    
    function onError(err) {
      $scope.errors = err.data;
    }
}

function AddressesCtrl() {
  console.log('----AccountAddressesCtrl-----');
}

function PaymentHistoryCtrl($scope, PaymentHistory) {
  $scope.items = PaymentHistory.query();
}
PaymentHistoryCtrl.$inject = ["$scope", "PaymentHistory"];

})();
/*!
 * Test Application
 * v0.0.0
 */
(function(){
"use strict";

angular.module('app.confirm', ['ui.bootstrap.modal'])
  .controller('ConfirmModalController', ["$scope", "$uibModalInstance", "data", function ($scope, $uibModalInstance, data) {
    $scope.data = angular.copy(data);

    $scope.ok = function (closeMessage) {
      $uibModalInstance.close(closeMessage);
    };

    $scope.cancel = function (dismissMessage) {
      if (angular.isUndefined(dismissMessage)) {
        dismissMessage = 'cancel';
      }
      $uibModalInstance.dismiss(dismissMessage);
    };

  }])
  .value('$confirmModalDefaults', {
    template: '<div class="modal-header"><h3 class="modal-title">{{data.title}}</h3></div>' +
    '<div class="modal-body">{{data.text}}</div>' +
    '<div class="modal-footer">' +
    '<button class="btn btn-primary" ng-click="ok()">{{data.ok}}</button>' +
    '<button class="btn btn-default" ng-click="cancel()">{{data.cancel}}</button>' +
    '</div>',
    controller: 'ConfirmModalController',
    defaultLabels: {
      title: 'Confirm',
      ok: 'OK',
      cancel: 'Cancel'
    }
  })
  .factory('$confirm', ["$uibModal", "$confirmModalDefaults", function ($uibModal, $confirmModalDefaults) {
    return function (data, settings) {
      var defaults = angular.copy($confirmModalDefaults);
      settings = angular.extend(defaults, (settings || {}));
      
      data = angular.extend({}, settings.defaultLabels, data || {});

      if ('templateUrl' in settings && 'template' in settings) {
        delete settings.template;
      }

      settings.resolve = {
        data: function () {
          return data;
        }
      };

      return $uibModal.open(settings).result;
    };
  }])
  .directive('confirm', ["$confirm", function ($confirm) {
    return {
      priority: 1,
      restrict: 'A',
      scope: {
        confirmIf: "=",
        ngClick: '&',
        confirm: '@',
        confirmSettings: "=",
        confirmTitle: '@',
        confirmOk: '@',
        confirmCancel: '@'
      },
      link: function (scope, element, attrs) {

        element.unbind("click").bind("click", function ($event) {

          $event.preventDefault();

          if (angular.isUndefined(scope.confirmIf) || scope.confirmIf) {

            var data = {text: scope.confirm};
            if (scope.confirmTitle) {
              data.title = scope.confirmTitle;
            }
            if (scope.confirmOk) {
              data.ok = scope.confirmOk;
            }
            if (scope.confirmCancel) {
              data.cancel = scope.confirmCancel;
            }
            $confirm(data, scope.confirmSettings || {}).then(scope.ngClick);
          } else {

            scope.$apply(scope.ngClick);
          }
        });

      }
    }
  }]);
})();
/*!
 * Test Application
 * v0.0.0
 */
(function(){
"use strict";

angular.module('core.components.geolocation', []);
})();
/*!
 * Test Application
 * v0.0.0
 */
(function(){
"use strict";

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
	this.$get = ["$mdToast", function($mdToast) {
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
	}]
}
})();