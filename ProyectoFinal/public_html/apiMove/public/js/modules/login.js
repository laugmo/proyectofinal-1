'use strict';

/* Login Module */

angular.module('app.login', [])
        .config(['$routeProvider', function config($routeProvider) {
                $routeProvider.when('/login', {
                    controller: 'LoginController',
                    templateUrl: 'partials/_login.html'
                });
            }])
        .controller('LoginController', ['$scope', function ($scope) {
                dpd.users.me(function (user) {
                    if (user) {
                        $scope.userLoaded = true;
                        $scope.currentUser = user;
                    }else 
                    $scope.userLoaded = false;
                });

                $scope.showLogin = function (val) {
                    $scope.loginVisible = val;
                    if (val) {
                        $scope.username = '';
                        $scope.password = '';
                    }
                };

                $scope.submitLogin = function (username, password) {
                    dpd.users.login({username: username, password: password}, function (session, error) {
                        if (error) {
                            alert(error.message);
                        } else {
                            location.href = "/index.html";
                        }
                    });
                    return false;
                };
                $scope.signUp = function () {
                    location.href = "_register.html";
                };
            }]);