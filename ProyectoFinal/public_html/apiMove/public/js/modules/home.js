

'use strict';

/* Home Module */

angular.module('app.home', [])
        .config(['$routeProvider', function config($routeProvider) {
                $routeProvider.when('/home', {
                    controller: 'SearchEventController',
                    templateUrl: 'partials/_home.html'
                });
            }])
        .controller('SearchEventController', ['$scope', function ($scope) {
            $scope.searchEvent = function() {
                if ($scope.searchTerm){
                    dpd.events.get({ $or: 
                        [{ name: $scope.searchTerm}, 
                        { location: $scope.searchTerm}, 
                        { sport: $scope.searchTerm }]
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

     }]);