/* App Module */

angular.module('app', ['app.home', 'app.users'])
.config( function myAppConfig ( $routeProvider ) {
    'use strict';
    $routeProvider.otherwise({ redirectTo: '/home' });
});