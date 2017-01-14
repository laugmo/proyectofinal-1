'use strict';

angular.module('app.user', [])
        .config(['$routeProvider', function config($routeProvider) {
                $routeProvider.when('/user', {
                    controller: 'UserController',
                    templateUrl: 'partials/_user.html'
                });
            }])
        .controller('GenerateSuggestion', ['$scope', function ($scope) {
                $scope.ParticipantsList;
                $scope.myId;
                $scope.currentEvent;

                dpd.users.me(function (user) {
                    $scope.reloadSugg(user);
                });

                $scope.reloadSugg = function (user) {
                    if (user) {
                        $scope.myId = user.id;
                        dpd.events.get(
                                {$or: [
                                        {discipline: {$in: [user.sports]}},
                                        {area: {$regex: '^.*' + user.neighbourhood + '.*$',
                                                $options: 'i'}}
                                    ]}, function (result, err) {
                            if (err)
                                return alert(err.message || "Error al buscar eventos");

                            $scope.sugerencias = result;
                            $scope.$$phase || $scope.$apply();
                        });
                    }
                };

                function callReload() {
                    dpd.users.me(function (user) {
                        $scope.reloadSugg(user);
                    });
                }

                $scope.getPart = function (evento) {
                    if (existsUserInEvent($scope.myId, evento))
                        return "No participar";
                    return "Participar";
                };

                $scope.editEvent = function (eId) {
                    dpd.events.get(eId, function (result, err) {
                        if (err)
                            return alert(err.message || "Error al intentar editar el evento");
                        $scope.currentEvent = result;
                        $scope.$$phase || $scope.$apply();
                    });
                };

                $scope.submitEditedEvent = function () {
                    console.log($scope.currentEvent);
                    dpd.events.put($scope.currentEvent, function (result, err) {
                        if (err)
                            return alert(err.message || "Error al editar evento");
                        $scope.$$phase || $scope.$apply();
                    });
                    callReload();
                };

                $scope.participate = function (idEvento) {
                    dpd.events.get(idEvento, function (result, err) {
                        if (err)
                            return alert(err.message || "Error");
                        $scope.currentEvent = result;
                        $scope.ParticipantsList = $scope.currentEvent.participants;
                        if (!existsUserInEvent($scope.myId, $scope.currentEvent))
                            $scope.ParticipantsList.push($scope.myId);
                        else {
                            var index = $scope.ParticipantsList.indexOf($scope.myId);
                            $scope.ParticipantsList.splice(index, 1);
                        }
                        dpd.events.put(idEvento, {participants: $scope.ParticipantsList}, function (res, err) {
                            if (err)
                                return alert(err.message || "Error al intentar participar");
                            console.log(res);
                            $scope.$$phase || $scope.$apply();
                        });
                        callReload();
                        $scope.$$phase || $scope.$apply();
                    });
                };

                function existsUserInEvent(myId, event) {
                    var i;
                    var temp = event.participants;
                    for (i = 0; i < temp.length; i++) {
                        if (temp[i] == myId)
                            return true;
                    }
                    return false;
                }

            }])

        .controller('SuggestUsers', ['$scope', function ($scope) {
                dpd.users.me(function (user) {
                    if (user) {
                        if (user.sports != null) {
                            console.log(user.sports[0]);
                            $scope.currentUser = user;
                            var currentNeighbourhood = user.neighbourhood;
                            var currentUsername = user.username;
                            var currentSports = user.sports;
                            $scope.filterUsers(currentUsername, currentNeighbourhood, currentSports);

                        }
                        ;
                    }
                    ;
                });
                $scope.filterUsers = function (currentUsername, currentNeighbourhood, currentSports) {
                    for (var i = 0; i < currentSports.length; i++) {
                        var sport = currentSports[i];
                        dpd.users.get(
                                {$and: [
                                        {username: {$ne: currentUsername}},
                                        {sports: {$in: [sport]}},
                                        {neighbourhood: {$eq: currentNeighbourhood}}
                                    ]},
                                function (result, err) {
                                    if (err) {
                                        return alert(err.message || "Error al buscar usuarios");
                                    }
                                    $scope.usuariosSugeridos = result;
                                    $scope.$apply();
                                });
                    }
                    ;
                };
            }
        ]);

