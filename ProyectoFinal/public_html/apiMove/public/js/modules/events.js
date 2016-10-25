'use strict';

/* Events Module */

var moveApp = angular.module('app', []);

angular.module('app.events', [])
    .config(['$routeProvider', function config($routeProvider) {
        $routeProvider.when('/events', {
            controller: 'EventsController',
            templateUrl: 'partials/_events.html'
        });
    }])
    .controller('EventsController', ['$scope', function ($scope) {

        dpd.users.get(function (result, err) {
            if (err) {
                // Alert if there's an error
                return alert(err.message || "Error al buscar usuarios");
            }
            $scope.usuarios = result;
        });

        $scope.addEvent = function (titleEvent, dateEvent, timeEvent, addressEvent, descrEvent, logoEvent, pubEvent) {
            var newEvent = {
                "name": titleEvent,
                "date": dateEvent + timeEvent,
                "location": {
                    "address" : addressEvent,
                    "neighbourhood" : null,
                    "city" : null,
                    "country" : null
                },
                "urlLogo": logoEvent,
                "description": descrEvent,
                "adminId": null,
                "participants": null,
                "public": pubEvent
            };
            dpd.events.post(newEvent, function (result, error) {
                if (err) {
                    // Alert if there's an error
                    return alert(err.message || "Error al listar eventos");
                } else {
                    return alert("Evento " + result.name + " agregaro correctamente!");
                }
            });
        };

    }]);