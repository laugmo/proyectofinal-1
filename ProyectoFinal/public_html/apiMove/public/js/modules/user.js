'use strict';

/* User Module */

angular.module('app.user', [])
        .config(['$routeProvider', function config($routeProvider) {
            $routeProvider.when('/user', {
                controller: 'UserController',
                templateUrl: 'partials/_user.html'
            });
        }])
//        .controller('UserController', ['$scope', function ($scope) {
//            dpd.user.get(function (result, err) {
//                if (err) {
//                    // Alert if there's an error
//                    return alert(err.message || "Error al buscar usuarios");
//                }
//                this.usuarios = result;
//            });
//        }])
          .controller('LoginController', ['$scope', function ($scope) {
                $scope.userLogin = function () {
                    if ($scope.userName && $scope.userPwd) {
                        dpd.users.login({
                            user: $scope.userName,
                            pass: $scope.userPwd}
                        , function (session, error) {
                            if (error) {
                                // Alert if there's an error
                                return alert(error.message || "Error al buscar usuarios");
                            }
                            $scope.user = session;
                            console.log(session);
                            location.href = "/_home.html";
                        });
                    }
                };
            }]);

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
                });*/
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
