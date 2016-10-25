'use strict';

/* User Module */

angular.module('app.users', [])
        .config(['$routeProvider', function config($routeProvider) {
                $routeProvider.when('/users', {
                    controller: 'UserController',
                    templateUrl: 'partials/_users.html'
                });
            }]);

angular.module('app.users')
        .controller('UserController', ['$scope', function($scope) {
                dpd.users.get(function (result, err) {
                    if (err) {
                        // Alert if there's an error
                        return alert(err.message || "Error al buscar usuarios");
                    }
                    $scope.usuarios = result;
                });
            }]);
