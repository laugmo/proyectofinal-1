'use strict';

/* User Module */

angular.module('app.user', [])
        .config(['$routeProvider', function config($routeProvider) {
                $routeProvider.when('/user', {
                    controller: 'UserController',
                    templateUrl: 'partials/_user.html'
                });
            }])
        .controller('UserController', ['$scope', function($scope) {
                dpd.users.get(function (result, err) {
                    if (err) {
                        // Alert if there's an error
                        return alert(err.message || "Error al buscar usuarios");
                    }
                    this.usuarios = result;
                });
            }]);
