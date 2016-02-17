'use strict';

module.exports = function(app) {

  var bodyParser = require('body-parser');
  var loopback = require('loopback');

  // to support JSON-encoded bodies
  app.use(bodyParser.json());
  // to support URL-encoded bodies
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  //// The access token is only available after boot
  app.use(app.loopback.token({
    model: app.models.accessToken,
    currentUserLiteral: 'me'
  }));

  var config = false;
  try {
    config = require('../../providers.json');
  } catch (err) {
    console.error(
      'Please configure your passport strategy in `providers.json`.');
    console.error(
      'Copy `providers.json.template` to `providers.json` and replace the clientID/clientSecret values with your own.'
    );
  }


  if (config) {
    console.log('Configuring passport');

    var loopbackPassport = require('loopback-component-passport');
    var PassportConfigurator = loopbackPassport.PassportConfigurator;
    var passportConfigurator = new PassportConfigurator(app);


    // Initialize passport
    passportConfigurator.init();

    // Set up related models
    passportConfigurator.setupModels({
      userModel: app.models.user,
      userIdentityModel: app.models.userIdentity,
      userCredentialModel: app.models.userCredential
    });

    for (var s in config) {
      var c = config[s];

      if (c.provider != 'local') {
        c.session = c.session !== false;
        passportConfigurator.configureProvider(s, c);
      }

    }

  }
};