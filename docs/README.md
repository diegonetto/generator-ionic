# Ionic Generator documentation

## Environment Specific Configuration

While building your Ionic app, you may find yourself working with multiple environments such as development, staging, and production. This generator uses [grunt-ng-constant] (https://github.com/werk85/grunt-ng-constant) to set up your workflow with development and production environment configurations right out of the box. 

### Using Inside Angular

A `config.js` file is created by `grunt-ng-constant` depending on which task target is executed. This config file exposes a `config` module, that is listed as a dependency inside `app/scripts/app.js`. Out of the box, your constants will be namespaced under `ENV`, but this can be changed by modifying the `ngconstant` targets. It is important to note that whatever namespace value is chosen is what will need to be used for Dependency Injection inside your Angular functions.



The following example shows how to pre-process all outgoing HTTP request URLs with an environment specific API endpoint by creating a simple Angular `$http` interceptor.



```

// Custom Interceptor for replacing outgoing URLs                

.factory('httpEnvInterceptor', function (ENV) {

  return {

    'request': function(config) {

      if (!_.contains(config.url, 'html')) {

        config.url = ENV.apiEndpoint + config.url;

      }

      return config;

    }

  }

})



.config(function($httpProvider) {

  // Pre-process outgoing request URLs

  $httpProvider.interceptors.push('httpEnvInterceptor');

})

```


## Special Thanks To

* The pioneers behind [Yeoman](http://yeoman.io/) for building an intelligent workflow management solution.

* The [AngularJS Generator](https://github.com/yeoman/generator-angular) and [Ionic Seed Project](https://github.com/driftyco/ionic-angular-cordova-seed) projects for inspiration.

* The visionaries at [Drifty](http://drifty.com) for creating the [Ionic Framework](http://ionicframework.com/).
