/* App Module */

angular.module('app', ['app.home', 'app.user'])
        .config(function myAppConfig($routeProvider) {
            'use strict';
            $routeProvider.otherwise({redirectTo: '/home'});
        })
        .controller('AppController', ['$scope', function ($scope) {
                this.eventos =[];
                dpd.events.get(function (result, err) {
                    if (err) {
                        // Alert if there's an error
                        return alert(err.message || "Error al listar eventos");
                    }
                    this.eventos = result;
                });
            }]);