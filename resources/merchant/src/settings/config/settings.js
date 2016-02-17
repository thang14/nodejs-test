angular.module('app.settings')
	.config(Config);


function Config($stateProvider) {
	$stateProvider

    .state('settings', {
      url: "/settings",
      templateUrl: "settings/settings.html",
      controller: SettingsCtrl,
    })
    .state('settings.account', {
      url: "/account",
      views: {
        "settings": {
          templateUrl: "settings/account.html",
      	  controller: AccountCtrl,
        }
      }
    })
    .state('settings.profile', {
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
      views: {
        "settings": {
          templateUrl: "settings/creditcards.html",
          controller: CreditcardsCtrl,
        }
      }
    })
    .state('settings.addresses', {
      url: "/addresses",
      views: {
        'settings': {
          templateUrl: "settings/addresses.html",
          controller: AddressesCtrl,
        }
      }
    })
    .state('settings.paymenthistory', {
      url: "/paymenthistory",
      views: {
        'settings': {
          templateUrl: "settings/paymenthistory.html",
          controller: PaymentHistoryCtrl,
        }
      }
    })
    .state('settings.orders', {
      url: "/orders",
      views: {
        'settings': {
          templateUrl: "settings/orders.html",
          controller: OrderCtrl,
        }
      }
    });
}


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

function SettingsCtrl() {
  console.log('----SettingsCtrl-----');
}

function ProfileCtrl($scope, Account, User) {
	$scope.profile = Account.user;
  $scope.save = function() {
     User.prototype$updateAttributes({id:$scope.profile.id}, $scope.profile);
  }
}

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
