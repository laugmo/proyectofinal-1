'use strict';

angular.module('app.user', [])
        .config(['$routeProvider', function config($routeProvider) {
                $routeProvider.when('/user', {
                    controller: 'UserController',
                    templateUrl: 'partials/_user.html'
                });
            }])
        .controller('GenerateSuggestion', ['$scope', function ($scope) {
                dpd.users.me(function (user) {
                    if (user) {
                        dpd.events.get(
                                {$or: [
                                {discipline: {$in: [user.sports]}},
                                {area: {$regex: '^.*' + user.neighbourhood + '.*$',
                                        $options: 'i'}}
                            ]}, function (result, err) {
                           if (err) {
                                return alert(err.message || "Error al buscar eventos");
                          }
                            $scope.sugerencias = result;
                            $scope.$apply();
                        });
                    }
                }
                );

            }])
        .controller('SuggestUsers', ['$scope', function ($scope) {
                dpd.users.me(function (user) {
                    if (user) {
                        if (user.sports.length() > 0) {
                            console.log(user.sports);
                            var currentUser = user;
                            //console.log(currentUser.neighbourhood);
                            var currentNeighbourhood = currentUser.neighbourhood;
                            var currentId = currentUser.id;
                            for (var i = 0; i < currentUser.sports.length(); i++) {
                                var currentSport = currentUser.sports[i];
                                dpd.users.get({
                                    $and: [
                                        {currentSport: {$in: [user.sports]}},
                                        {neighbourhood: {$regex: '^.*' + currentNeighbourhood + '.*$',
                                                $options: 'i'}},
                                        {id: {$ne: currentId}}
                                    ]}, function (result, err) {
                                    if (err) {
                                        return alert(err.message || "Error al buscar usuarios");
                                    }
                                    $scope.usuariosSugeridos = result;
                                    $scope.$apply();
                                });
                                i++;
                            }
                        };
                    };
                }, function (result, err) {
                           if (err) {
                                return alert(err.message || "Error al buscar usuarios");
                          }
                            $scope.usuariosSugeridos = result;
                            $scope.$apply();
                        });
            }
        ]);
//                        dpd.events.get(
//                                {$or: [
//                                {discipline: {$in: [user.sports]}},
//                                {area: {$regex: '^.*' + user.neighbourhood + '.*$',
//                                        $options: 'i'}}
//                            ]}, function (result, err) {
//                           if (err) {
//                                return alert(err.message || "Error al buscar eventos");
//                          }
//                            $scope.sugerencias = result;
//                            $scope.$apply();
//                        });
//                    }
//                }
//                );

        //]);

      /*.controller('SuggestUsers', ['$scope', function ($scope) {
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
//                                   if (err) {
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
