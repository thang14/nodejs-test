
module.exports = function(User) {
	
	/**
	 * Change password
	 */
	User.changePassword = function(id, options, cb) {
		var UserModel = this;

		if (typeof options.password !== 'string') {
      var err = new Error('New password is required');
      err.statusCode = 400;
      err.code = 'NEW_PASSWORD_REQUIRED';
      return cb(err);
    }

		UserModel.findOne({id:id}, function(err, user) {
			if (err) {
        return cb(err);
      }

      user.hasPassword(options.oldPassword, function(err, isMatch) {
      	if (err) {
	        return cb(err);
	      }

	      if(!isMatch) {
	      	var defaultError = new Error('Incorrect old password');
	      	defaultError.statusCode = 401;
	      	defaultError.code = 'CHANGE_PASSWORD_FAILED';
	      	return cb(defaultError);
	      } else {
	      	user.password = UserModel.hashPassword(options.password);
	      	user.save(function(err) {
	      		if (err) {
			        return cb(err);
			      }
			      cb();
	      	});
	      }
      });

		});
	}

	/*!
   * Setup an extended user model.
   */
  User.setup = function() {
    // We need to call the base class's setup method
    User.base.setup.call(this);
    var UserModel = this;

    UserModel.remoteMethod(
      'changePassword',
      {
        description: 'Change password for user login.',
        accepts: [
          {arg: 'id', type: 'any', required: true, http: {source: 'path'}},
          {arg: 'options', type: 'object', required: true, http: {source: 'body'}},
        ],
        http: {verb: 'post', path: '/:id/changePassword'}
      }
    );
  }


  User.setup();

}