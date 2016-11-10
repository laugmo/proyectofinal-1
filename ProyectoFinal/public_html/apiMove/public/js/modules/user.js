'use strict';

/* User Module */

angular.module('app.user', [])
        .config(['$routeProvider', function config($routeProvider) {
            $routeProvider.when('/user', {
                controller: 'UserController',
                templateUrl: 'partials/_user.html'
            });
        }])

      /*  .controller('GenerateSuggestion', ['$scope', function ($scope) {
            $scope.searchEvent = function () {
        if ($scope.searchTerm) {
        dpd.users.me(function(user) {
        if (user) {
        dpd.events.get({$or:
        [{name:{$in:[]}}]
        }, function(result, err){});
        }

        // Alert if there's an error
        return alert(error.message || "No se pudo obtener el usuario");
        } else{
        currentUser = result;
                // Do something
                });
//                        dpd.events.get({$or:
//                                    [{name: {$regex: '^.*' + $scope.searchTerm + '.*$',
//                $options: 'i'
//              }},
//                                        {area: {$regex: '^.*' + $scope.searchTerm + '.*$',
//                $options: 'i'
//              }},
//                                        {discipline: {$regex: '^.*' + $scope.searchTerm + '.*$',
//                $options: 'i'
//              }}]
//                        },
//                                function (result) {
//                                   /* if (err) {
//                                        // Alert if there's an error
//                                        return alert(err.message || "Error al buscar eventos");
//                                    }*/
//                                    $scope.eventos = result;
//                                });
//
//                    }
//                };
//
//            }]);
