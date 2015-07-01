/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'sparl-core',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
       minifyHTML: {
          enabled: true,
          minifierOptions: {
              collapseWhitespace : true,
              removeComments     : true,
              minifyJS           : true,
              minifyCSS          : true
          }
        }      
    }
  };

  if (environment === 'development') {
     ENV.APP.LOG_RESOLVER = false;
     ENV.APP.LOG_ACTIVE_GENERATION = false;
     ENV.APP.LOG_TRANSITIONS = false;
     ENV.APP.LOG_TRANSITIONS_INTERNAL = false;
     ENV.APP.LOG_VIEW_LOOKUPS = false;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  ENV['contentSecurityPolicy'] = {
        'default-src': "'none'",
        'script-src': "'self' http://sparlv2/ http://sparlv2:35729",
        'font-src': "'self' http://sparlv2/",
        'connect-src': "'self' http://10.105.5.55:9000 http://sparlv2/ ws://sparlv2:35729",
        'img-src': "'self' http://sparlv2/ http://lorempixel.com",
        'style-src': "'self' http://sparlv2/ 'unsafe-inline'",
        'media-src': "'self' http://sparlv2/"
  };

  ENV['simple-auth'] = {
    crossOriginWhitelist: ['http://10.105.5.55:9000'],
    authorizer: 'simple-auth-authorizer:oauth2-bearer'
  };

  ENV['simple-auth-oauth2'] = {
    serverTokenEndpoint: 'http://10.105.5.55:9000/o/token/',
    crossOriginWhitelist: ['http://10.105.5.55:9000']
  };
  
  return ENV;
};
