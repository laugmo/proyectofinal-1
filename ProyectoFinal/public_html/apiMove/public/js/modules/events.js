'use strict';

/* Events Module */

angular.module('app.events', [])
        .config(['$routeProvider', function config($routeProvider) {
                $routeProvider.when('/events', {
                    redirectTo: '/events',
                    controller: 'EventsController',
                    templateUrl: 'partials/_events.html'
                });
            }])
        .controller('EventsController', ['$scope', function ($scope) {
                $scope.newEvent = {};
        
                $scope.currentUser;
                
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
                $scope.addEvent = function () {
                    dpd.sports.get($scope.addSport,function (result, err) {
                        if (err) {
                            return alert(err.message || "Error al buscar eventos");
                        }
                        $scope.newEvent.discipline = result.keyWords[0];
                    });
                    $scope.newEvent.discipline.sports = $scope.addSport;
                    $scope.newEvent.adminId = $scope.currentUser.id;
                    $scope.newEvent.participants = [];
                    $scope.newEvent.area = $scope.newEvent.location.neighbourhood.toLowerCase();
                    console.log($scope.newEvent);
                    dpd.events.post($scope.newEvent, function (result, error) {
                        if (error) {
                            // Alert if there's an error
                            return alert(error.message || "Error al agregar Evento");
                        } else {
                            $scope.newEvent = {};
                            return alert("Evento " + result.name + " agregado correctamente!");
                        }
                    });
                    location.reload();
                };
            }]);