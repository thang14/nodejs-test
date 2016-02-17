angular.module("templates").run(["$templateCache", function($templateCache) {$templateCache.put("account/account.html","account.js");
$templateCache.put("auth/login.html","");
$templateCache.put("home/index.html","<div ng-include=\"\'partials/search.html\'\"></div>\r\n\r\n<nav class=\"navbar navbar-default\">\r\n  <div class=\"container container-fluid text-center\">\r\n    Home\r\n  </div><!-- /.container-fluid -->\r\n</nav>\r\n");
$templateCache.put("layouts/main.html","<div ng-include=\"\'partials/toolbar.html\'\"></div><!--Toolbar-->\r\n<div ui-view></div><!--ui view-->\r\n<div ng-include=\"\'partials/footer.html\'\"></div><!--footer-->");
$templateCache.put("partials/dialogCardAdd.html","<div class=\"modal-header\">\n		<h3 class=\"modal-title\">Add New Card</h3>\n</div>\n<div class=\"modal-body\">\n	<form method=\"post\" ng-submit=\"save()\" name=\"addCardForm\" style=\"max-width:400px;\">\n        <md-input-container class=\"md-block md-input-invalid text-center\"  ng-if=\"errors.message\" >\n            <div ng-message-exp=\'error\'>{{errors.message}}</div>\n        </md-input-container></br>\n    \n        <div layout-gt-sm=\"row\">\n          <md-input-container class=\"md-block\" flex-gt-sm>\n            <label>Card number</label>\n            <input ng-model=\"card.number\">\n          </md-input-container>\n          <md-input-container class=\"md-block\" flex-gt-sm>\n            <label>CVC</label>\n            <input ng-model=\"card.cvc\">\n          </md-input-container>\n        </div>\n        \n        <div layout-gt-sm=\"row\" style=\"max-width:200px;\">\n          <md-input-container class=\"md-block\" flex-gt-sm>\n            <label>Exp. month</label>\n            <input ng-model=\"card.exp_month\">\n          </md-input-container>\n          <md-input-container class=\"md-block\" flex-gt-sm>\n            <label>Exp. year</label>\n            <input ng-model=\"card.exp_year\">\n          </md-input-container>\n        </div>\n        <div class=\"modal-footer\"> \n            <button type=\"button\" class=\"btn btn-default\" ng-click=\"close()\">Cancel</button> \n            <button type=\"submit\" class=\"btn btn-primary\">Save</button> \n        </div>\n    </form>\n</div>\n");
$templateCache.put("partials/dialogCardDetails.html","\n<div class=\"modal-header\">\n		<h3 class=\"modal-title\">Edit Card</h3>\n</div>\n<div class=\"modal-body\">\n	<form method=\"post\" ng-submit=\"save()\" name=\"addCardForm\" style=\"max-width:400px;\">\n        <md-input-container class=\"md-block md-input-invalid text-center\"  ng-if=\"errors.message\" >\n            <div ng-message-exp=\'error\'>{{errors.message}}</div>\n        </md-input-container></br>\n    \n        <div layout-gt-sm=\"row\" style=\"max-width:200px;\">\n          <md-input-container class=\"md-block\" flex-gt-sm>\n            <label>Exp. month</label>\n            <input ng-model=\"card.exp_month\">\n          </md-input-container>\n          <md-input-container class=\"md-block\" flex-gt-sm>\n            <label>Exp. year</label>\n            <input ng-model=\"card.exp_year\">\n          </md-input-container>\n        </div>\n        <div class=\"modal-footer\"> \n            <button type=\"button\" class=\"btn btn-default\" ng-click=\"close()\">Cancel</button> \n            <button type=\"submit\" class=\"btn btn-primary\">Save</button> \n        </div>\n    </form>\n</div>\n");
$templateCache.put("partials/footer.html","<footer>\r\n	<div class=\"container\">\r\n		<ul class=\"site-footer-links\">\r\n			<li><a href=\"#\">Merchants</a></li> \r\n			<li><a href=\"#\">Supports</a></li>\r\n			<li><a href=\"#\">Teams</a></li>  \r\n			<li><a href=\"#\">Developers</a></li> \r\n			<li><a href=\"#\">About us</a></li> \r\n		</ul>\r\n		<div id=\"license-footer\" class=\"ng-binding\">\r\n			Powered by On.com ©2015–2016.\r\n		</div>\r\n	</div>\r\n</footer>");
$templateCache.put("partials/loginDialog.html","<div class=\"modal-header\">\r\n		<h3 class=\"modal-title\">Login</h3>\r\n</div>\r\n<div class=\"modal-body\">\r\n	<form method=\"post\" ng-submit=\"login()\" name=\"loginForm\">\r\n    <md-dialog-content>\r\n      <md-input-container class=\"md-block md-input-invalid text-center\"  ng-if=\"errors.message\" >\r\n	      <div ng-message-exp=\'error\'>{{errors.message}}</div>\r\n      </md-input-container></br>\r\n\r\n      Login as:\r\n      <md-radio-group ng-init=\"user.realm = \'customer\'\" ng-model=\"user.realm\">\r\n	      <md-radio-button value=\"customer\" class=\"md-primary\">Customer</md-radio-button>\r\n	      <md-radio-button value=\"merchant\"> Merchat </md-radio-button>\r\n	    </md-radio-group>\r\n	    \r\n      <md-input-container class=\"md-block\">\r\n	      <!-- Use floating placeholder instead of label -->\r\n	      <md-icon class=\"email\"><i class=\"material-icons\">email</i></md-icon>\r\n	      <input ng-model=\"user.email\" type=\"email\" placeholder=\"Email (required)\" ng-required=\"true\">\r\n    	</md-input-container>\r\n    	<md-input-container class=\"md-block\">\r\n	      <!-- Use floating placeholder instead of label -->\r\n	      <md-icon class=\"password\"><i class=\"material-icons\">vpn_key</i></md-icon>\r\n	      <input ng-model=\"user.password\" type=\"password\" placeholder=\"Password (required)\" ng-required=\"true\">\r\n				<md-checkbox md-no-ink aria-label=\"Remember Me\" ng-model=\"user.rememberMe\" class=\"md-primary\" style=\"margin-top: 10px;\">\r\n						Remember Me\r\n				</md-checkbox>\r\n    	</md-input-container>\r\n			<div layout=\"row\" layout-sm=\"column\" layout-align=\"center\" >\r\n				<md-button flex=\"100\" type=\"submit\" class=\"md-primary md-raised\">Login</md-button>\r\n			</div>\r\n			<div class=\"text-center\">Sign up <a href=\"#\" ng-click=\"signup()\">here</a></div>\r\n\r\n			<button class=\"btn btn-block btn-facebook\" ng-click=\"authenticate(\'facebook\')\">\r\n          <i class=\"ion-social-facebook\"></i> Sign in with Facebook\r\n        </button>\r\n    </md-dialog-content>\r\n  </form>\r\n</div>");
$templateCache.put("partials/realmDialog.html","<div class=\"modal-header\">\n		<h3 class=\"modal-title\">Who are you?</h3>\n</div>\n<div class=\"modal-body\">\n	<form method=\"post\" ng-submit=\"save()\" name=\"loginForm\">\n    <md-dialog-content>\n      <md-radio-group ng-model=\"user.realm\">\n	      <md-radio-button value=\"customer\" class=\"md-primary\">Customer</md-radio-button>\n	      <md-radio-button value=\"merchant\"> Merchat </md-radio-button>\n	    </md-radio-group>\n			<div layout=\"row\" layout-sm=\"column\" layout-align=\"center\" >\n				<md-button flex=\"100\" type=\"submit\" class=\"md-primary md-raised\">Login</md-button>\n			</div>\n    </md-dialog-content>\n  </form>\n</div>");
$templateCache.put("partials/search.html","<div class=\"hd-site-search\">\r\n	<div class=\"input-group input-group-lg\">\r\n	  <input type=\"text\" class=\"form-control\" placeholder=\"Search for keywords\" aria-describedby=\"sizing-addon1\">\r\n	  <a href=\"#\" class=\"input-group-addon\" id=\"sizing-addon1\" >Search</a>\r\n	</div>\r\n</div>");
$templateCache.put("partials/signupDialog.html","<div class=\"modal-header\">\r\n		<h3 class=\"modal-title\">Signup</h3>\r\n</div>\r\n<div class=\"modal-body\">\r\n	<form method=\"post\" ng-submit=\"signup()\" name=\"signupForm\">\r\n    <md-dialog-content>\r\n	    	<md-input-container class=\"md-block md-input-invalid text-center\"  ng-if=\"errors.message\" >\r\n			      <div ng-message-exp=\'error\'>{{errors.message}}</div>\r\n		      </md-input-container></br>\r\n\r\n			Signup as:\r\n      <md-radio-group ng-init=\"user.realm = \'customer\'\" ng-model=\"user.realm\">\r\n	      <md-radio-button value=\"customer\" class=\"md-primary\">Customer</md-radio-button>\r\n	      <md-radio-button value=\"merchant\"> Merchat </md-radio-button>\r\n	    </md-radio-group>\r\n	    <md-input-container class=\"md-block\">\r\n	      <!-- Use floating placeholder instead of label -->\r\n	      <md-icon class=\"name\"><i class=\"material-icons\">name</i></md-icon>\r\n	      <input ng-model=\"user.name\" type=\"text\" placeholder=\"Name\" >\r\n    	</md-input-container>\r\n			<md-input-container class=\"md-block\">\r\n					<label>Email</label>\r\n					<input ng-model=\"user.email\" type=\"email\" placeholder=\"Email\" ng-required=\"true\">\r\n			</md-input-container>\r\n			\r\n			<md-input-container class=\"md-block\">\r\n					<label>Password</label>\r\n					<input ng-model=\"user.password\" type=\"password\" placeholder=\"Password\" ng-required=\"true\">\r\n			</md-input-container>\r\n\r\n			<md-input-container class=\"md-block\" ng-if=\"user.realm == \'merchant\'\">\r\n					<label>Address</label>\r\n					<input ng-model=\"user.address\" type=\"text\" placeholder=\"Address\" ng-required=\"true\">\r\n			</md-input-container>\r\n			\r\n			<div layout=\"row\" layout-sm=\"column\" layout-align=\"center\" >\r\n				<md-button flex=\"100\" type=\"submit\" class=\"md-primary md-raised\">Signup</md-button>\r\n			</div>\r\n			\r\n			<div class=\"text-center\">Log in <a href=\"#\" ng-click=\"login()\">here</a></div>\r\n    </md-dialog-content>\r\n  </form>\r\n</div>\r\n");
$templateCache.put("partials/toolbar.html","<div ng-controller=\"ToolbarCtrl\" ng-cloak>\r\n  <md-toolbar>\r\n    <div class=\"md-toolbar-tools site-toolbar-tools\">\r\n      <div layout=\"row\" flex class=\"fill-height\">\r\n        <h2>\r\n          <a ui-sref=\"home\"><strong>Welcome {{auth.realm}}</strong></a>\r\n        </h2>\r\n        <md-button class=\"md-icon-button\" hide-gt-sm aria-label=\"Toggle Menu\">\r\n          <i class=\"material-icons\">menu</i>\r\n        </md-button>\r\n        <span flex></span>\r\n        <md-button ng-if=\"!isAuthenticated()\" aria-label=\"Login\" ng-click=\"login()\">\r\n          <strong>Login</strong>\r\n        </md-button>\r\n\r\n\r\n        <div ng-if=\"isAuthenticated()\" class=\"md-toolbar-item site-toolbar-dropdown\" uib-dropdown>\r\n          <a id=\"username-button\" type=\"button\" href=\"#\" uib-dropdown-toggle ng-disabled=\"disabled\">\r\n            {{auth.name || auth.email}} <span class=\"caret\"></span>\r\n          </a>\r\n          <ul uib-dropdown-menu role=\"menu\" aria-labelledby=\"username-button\">\r\n            <li role=\"menuitem\"><a ui-sref=\"settings.profile\">{{auth.name || auth.email}}</a></li>\r\n            <li class=\"divider\"></li>\r\n            <li role=\"menuitem\"><a ui-sref=\"settings.profile\">Profile</a></li>\r\n            <li class=\"divider\"></li>\r\n            <li role=\"menuitem\"><a href=\"#\" ng-click=\"logout()\">Logout</a></li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>  \r\n  </md-toolbar>\r\n</div>");
$templateCache.put("settings/account.html","<div class=\"panel panel-default\">\r\n  <div class=\"panel-heading\">\r\n    <h3 class=\"panel-title\">Change password</h3>\r\n  </div>\r\n  <div class=\"panel-body\">\r\n  	<div style=\"max-width:460px;\">\r\n	    <form name=\"changePasswordForm\" ng-submit=\"save()\">\r\n	    	<md-input-container class=\"md-block md-input-invalid\"  ng-if=\"errors.message\" >\r\n	      	<div ng-message-exp=\'error\'>{{errors.message}}</div>\r\n      	</md-input-container></br>\r\n	    	<md-input-container class=\"md-block\">\r\n	          <label>Old password</label>\r\n	          <input type=\"password\" ng-model=\"account.oldPassword\" required minlength=\"6\">\r\n        </md-input-container>\r\n        <md-input-container class=\"md-block\">\r\n          <label>New password</label>\r\n          <input type=\"password\" ng-model=\"account.password\" required minlength=\"6\">\r\n        </md-input-container>\r\n        <button type=\"submit\" class=\"btn btn-default\">Save</button> \r\n	    </form>\r\n	</div>\r\n  </div>\r\n</div>");
$templateCache.put("settings/addresses.html","<div class=\"panel panel-default\">\r\n  <div class=\"panel-heading\">\r\n    <h3 class=\"panel-title\">Addresses</h3>\r\n  </div>\r\n  <div class=\"panel-body\">\r\n  	You have no saved address\r\n  </div>\r\n  <div class=\"panel-footer\">\r\n  	<a href=\"#\" class=\"show\">+ Add address</a>\r\n  </div>\r\n</div>");
$templateCache.put("settings/creditcards.html","<div class=\"panel panel-default\">\r\n  <div class=\"panel-heading\">\r\n    <h3 class=\"panel-title\">Credit cards</h3>\r\n  </div>\r\n  <div class=\"panel-body\">\r\n  	<table class=\"table table-bordered\">\r\n      <tr ng-if=\"cards.length > 0\" ng-repeat=\"card in cards\">\r\n          <td>{{card.brand}}</td>\r\n          <td>{{card.exp_month}}/{{card.exp_year}}</td>\r\n          <td>****{{card.last4}}</td>\r\n          <td>\r\n              <a href=\"javascript:void(0)\" ng-click=\"edit(card)\">Edit</a>\r\n              <a href=\"javascript:void(0)\" ng-click=\"remove(card)\" confirm=\"Are you sure delete, {{card.brand}}?\">Delete</a>\r\n          </td>\r\n      </tr>\r\n      <tr ng-if=\"cards.length <= 0\">\r\n          <td colspan=\"4\" class=\"text-center\">Could not find data</td>\r\n      </tr>\r\n    </table>\r\n  </div>\r\n  <div class=\"panel-footer\">\r\n  	<a href=\"javascript:void(0)\" class=\"show\" ng-click=\"add()\">+ Add card</a>\r\n  </div>\r\n</div>\r\n");
$templateCache.put("settings/orders.html","<div class=\"panel panel-default\">\r\n  <div class=\"panel-heading\">\r\n    <h3 class=\"panel-title\">Orders</h3>\r\n  </div>\r\n  <div class=\"panel-body\">\r\n  	You have no order\r\n  </div>\r\n</div>");
$templateCache.put("settings/paymenthistory.html","<div class=\"panel panel-default\">\r\n  <div class=\"panel-heading\">\r\n    <h3 class=\"panel-title\">Payment history</h3>\r\n  </div>\r\n  <div class=\"panel-body\">\r\n  	<table class=\"table table-bordered\">\r\n      <tr ng-if=\"items.length > 0\" ng-repeat=\"item in items\">\r\n          <td>{{item.id}}</td>\r\n          <td>{{item.amount}}</td>\r\n          <td>{{item.description}}</td>\r\n          <td>{{item.created}}</td>\r\n      </tr>\r\n      <tr ng-if=\"items.length <= 0\">\r\n          <td colspan=\"3\" class=\"text-center\">Could not find data</td>\r\n      </tr>\r\n    </table>\r\n  </div>\r\n</div>");
$templateCache.put("settings/profile.html","<div class=\"panel panel-default\">\r\n  <div class=\"panel-heading\">\r\n    <h3 class=\"panel-title\">Profile</h3>\r\n  </div>\r\n  <div class=\"panel-body\">\r\n    <form name=\"profileForm\" ng-submit=\"save()\">\r\n    		<md-input-container class=\"md-block\">\r\n	          <label>Name</label>\r\n	          <input ng-model=\"profile.name\" required>\r\n        </md-input-container>\r\n        <md-input-container class=\"md-block\" ng-if=\"profile.realm ==\'merchant\'\">\r\n            <label>Address</label>\r\n            <input ng-model=\"profile.address\">\r\n        </md-input-container>\r\n        <button type=\"submit\" class=\"btn btn-default\">Save</button> \r\n    </form>\r\n  </div>\r\n</div>");
$templateCache.put("settings/settings.html","<div class=\"container site-container\">\r\n	<div class=\"row\">\r\n		<div class=\"col-sm-3\">\r\n			<div class=\"list-group\">\r\n			  <a ui-sref-active=\"active\" ui-sref=\"settings.profile\" class=\"list-group-item\">Profile</a>\r\n			  <a ui-sref-active=\"active\" ui-sref=\"settings.account\" class=\"list-group-item\">Account</a>\r\n			</div>\r\n		</div>\r\n		<div class=\"col-sm-9\" ui-view=\"settings\">\r\n			\r\n		</div>\r\n	</div>\r\n</div>");}]);