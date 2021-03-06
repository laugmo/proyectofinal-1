'use strict';

angular.module('app.home', [])
        .config(['$routeProvider', function config($routeProvider) {
                $routeProvider.when('/', {
                    templateUrl: 'partials/_home.html',
                    redirectTo: '/',
                    controller: 'SearchEventController',
                    controllerAs: 'searcEventCtrl'
                });
            }])
        .controller('SearchEventController', ['$scope', function ($scope) {
                $scope.init = function () {
                    dpd.events.get(function (result, err) {
                        if (err) {
                            // Alert if there's an error
                            return alert(err.message || "Error al buscar eventos");
                        }
                        $scope.eventos = result;
                        $scope.searched = false;
                        $scope.$apply();
                    });
                };
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
                                    console.log(result);
                                    if (result.length == 0) {
                                        $scope.searched = true;
                                    } else
                                        $scope.searched = false;
                                    $scope.$apply();
                                });
                    } else {
                        $scope.reloadAll();
                    }
                };
                $scope.reloadAll = function () {
                    dpd.events.get(function (result, err) {
                        if (err) {
                            // Alert if there's an error
                            return alert(err.message || "Error al buscar eventos");
                        }
                        $scope.eventos = result;
                        $scope.$apply();
                    });
                };
                $scope.warnLogin = function(){
                    alert("Inicia sesión para poder participar de eventos");
                };
            }]);

