'use strict';

angular.module('app.home', [])
        .config(['$routeProvider', function config($routeProvider) {
                $routeProvider.when('/home', {
                    templateUrl: 'partials/_home.html',
                    controller: 'SearchEventController',
                    controllerAs: 'searcEventCtrl'
                });
            }])
        .controller('SearchEventController', ['$scope', function ($scope) {
                $scope.searchEvent = function () {
                    if ($scope.searchTerm) {
                        dpd.events.get({$or:
                                    [{name: {$regex: '^.*' + $scope.searchTerm + '.*$',
                                                $options: 'i'
                                            }},
                                        {area: {$regex: '^.*' + $scope.searchTerm + '.*$',
                                                $options: 'i'
                                            }},
                                        {discipline: {$regex: '^.*' + $scope.searchTerm + '.*$',
                                                $options: 'i'
                                            }}]
                        },
                                function (result, err) {
                                    if (err) {
                                        // Alert if there's an error
                                        return alert(err.message || "Error al buscar eventos");
                                    }
                                    $scope.eventos = result;
                                });

                    }
                };

            }])
        .controller('GetEventsController', ['$scope', function ($scope) {
                $scope.init = function () {
                    dpd.events.get(function (result, err) {
                        if (err) {
                            // Alert if there's an error
                            return alert(err.message || "Error al buscar eventos");
                        }
                        $scope.eventos = result;
                    });
                };
            }]);

