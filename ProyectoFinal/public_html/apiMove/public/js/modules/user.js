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
                        if (user.sports.length > 0) {
                            console.log(user.sports[0]);
                            $scope.currentUser = user;
                            var currentNeighbourhood = user.neighbourhood;
                            var currentUsername = user.username;
                            var currentSports = user.sports;
                            $scope.filterUsers(currentUsername,currentNeighbourhood,currentSports);

                        };
                    };
                });
                $scope.filterUsers = function (currentUsername, currentNeighbourhood, currentSports) {
                    for (var i = 0; i < currentSports.length; i++) {
                        var sport = currentSports[i];
                        dpd.users.get(
                            {$and: [
                                {username: {$ne: currentUsername}},
                                {sports: {$in: [sport]}},
                                {neighbourhood: {$eq:currentNeighbourhood}}
                            ]},
                        function (result, err) {
                            if (err) {
                                return alert(err.message || "Error al buscar usuarios");
                            }
                            $scope.usuariosSugeridos = result;
                            $scope.$apply();
                        });
                    };
                };
            }
        ]);

