/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/


(function () {
    'use strict';

    angular
        .module('app.routes')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, helper) {

        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(false);

        // defaults to dashboard
        $urlRouterProvider.otherwise('/');

        // 
        // Application Routes
        // -----------------------------------   
        $stateProvider
          .state('app', {
              url:'/',
              title: 'Move!',
              abstract: true
              // resolve: helper.resolveFor('modernizr', 'icons')
          })
          .state('app.home', {
              url: '/home',
              title: 'Move!',
              templateUrl: helper.basepath('partials/_home.html'),
              //resolve: helper.resolveFor('oitozero.ngSweetAlert', 'datatables','localytics.directives')
          })
          .state('app.profile', {
              url: '/profile',
              title: 'Move! Profile',
              templateUrl: helper.basepath('partials/_profile.html'),
          })
          .state('app.events', {
              url: '/events',
              title: 'Move! Events',
              templateUrl: helper.basepath('partials/_events.html'),
          })
          .state('app.user', {
              url: '/user',
              title: 'Move! Home',
              templateUrl: helper.basepath('partials/_user.html'),
          })
          // .state('app.new_sample', {
          //     url: '/sample?sampleId',
          //     title: 'Sample',
          //     templateUrl: helper.basepath('Samples/AddEdit'),
          //     resolve: helper.resolveFor('ui.bootstrap-slider', 'whirl', 'oitozero.ngSweetAlert', 'localytics.directives')
          // })
        // 
        // CUSTOM RESOLVES
        //   Add your own resolves properties
        //   following this object extendb
        //   method
        // ----------------------------------- 
        // .state('app.someroute', {
        //   url: '/some_url',
        //   templateUrl: 'path_to_template.html',
        //   controller: 'someController',
        //   resolve: angular.extend(
        //     helper.resolveFor(), {
        //     // YOUR RESOLVES GO HERE
        //     }
        //   )
        // })
        ;

    } // routesConfig

})();

