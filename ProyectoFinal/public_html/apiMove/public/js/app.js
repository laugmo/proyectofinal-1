/* App Module */

angular.module('app', ['app.events', 'app.home', 'app.user'])
        .config(function myAppConfig($routeProvider) {
            'use strict';
            $routeProvider.otherwise({redirectTo: '/home'});
        })
  
;