'use strict';

/* Events Module */

angular.module('app.events', [])
        .config(['$routeProvider', function config($routeProvider) {
                $routeProvider.when('/events', {
                    controller: 'EventsController',
                    templateUrl: 'partials/_events.html'
                });
            }])
        .controller('EventsController', ['$scope', function ($scope) {
                $scope.loadSports = function(){
                    dpd.sports.get(function (result, err) {
                        if (err) {
                            // Alert if there's an error
                            return alert(err.message || "Error al buscar deportes");
                        }
                        $scope.sports = result;
                        $scope.$apply();
                   });
                };
                $scope.init = function () {
                    dpd.events.get(function (result, err) {
                        if (err) {
                            // Alert if there's an error
                            return alert(err.message || "Error al buscar eventos");
                        }
                        $scope.eventos = result;
                    });
                };
                $scope.addEvent = function (titleEvent, dateEvent, timeEvent, addressEvent, neighbEvent, cityEvent, countryEvent, descrEvent, logoEvent, pubEvent) {
                    var newEvent = {
                        "name": titleEvent,
                        "date": {
                            "date": dateEvent,
                            "time": timeEvent
                        },
                        "location": {
                            "address": addressEvent,
                            "neighbourhood": neighbEvent,
                            "city": cityEvent,
                            "country": countryEvent
                        },
                        "urlLogo": null,
                        "description": descrEvent,
                        "adminId": "983748276384",
                        "participants": null,
                        "public": pubEvent,
                        "sports": ["46865435468", "54684656213"],
                        "area": neighbEvent.toLowerCase(),
                        "discipline": "futbol"
                    };
                    console.log(newEvent);
                    dpd.events.post(newEvent, function (result, error) {
                        if (error) {
                            // Alert if there's an error
                            return alert(error.message || "Error al agregar Evento");
                        } else {
                            return alert("Evento " + result.name + " agregado correctamente!");
                        }
                    });
                    location.reload();
                };
            }]);