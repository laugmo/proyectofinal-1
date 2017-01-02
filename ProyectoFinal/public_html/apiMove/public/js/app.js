/* App Module */

angular.module('app', ['app.home', 'app.user', 'app.events', 'app.profile'/*, 'ngSanitize'*/])
        .config(function myAppConfig($routeProvider) {
            'use strict';
            $routeProvider.otherwise({
                redirectTo: '/home',
                controller: 'IndexController'
            });
        })
        .controller('IndexController', function ($scope) {
            $scope.currentUser;
            $scope.htmlLoginHead;
            dpd.users.me(function (user) {
                if (user) {
                    $scope.userLoaded = true;
                    $scope.currentUser = user;
                    $scope.htmlLoginHead =
                            '<li><a ng-show="userLoaded" disabled="disabled"> Buen día, {{currentUser.name}}!</a></li>' +
                            '<li ng-show="userLoaded" class="dropdown">' +
                            '<a href="#" class="dropdown-toggle user-icon" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span></span></a>' +
                            '<ul class="dropdown-menu">' +
                            '<li><a ng-click="myProfile(currentUser)">Mi Perfil</a></li>' +
                            '<li><a href="#">Another action</a></li>' +
                            '<li><a href="#">Something else here</a></li>' +
                            '<li role="separator" class="divider"></li>' +
                            '<li><a href="#">Separated link</a></li>' +
                            '<li role="separator" class="divider"></li>' +
                            '<li><a href="#">One more separated link</a></li>' +
                            '</ul>' +
                            '</li>' +
                            '<li><a ng-show="userLoaded" ng-click="logout()">Logout</a></li>';
                    $scope.includePath = "partials/_user.html";
                    $scope.$apply();

                } else {
                    $scope.userLoaded = false;
                    $scope.htmlLoginHead =
                            '<li><a data-toggle="modal" data-target="#loginModal" ng-hide="userLoaded">Login</a></li>' +
                            '<li><a data-toggle="modal" data-target="#registModal" ng-hide="userLoaded">Registrarse</a></li>';
                    $scope.includePath = "partials/_home.html";
                    $scope.$apply();

                }
            });

            $scope.myProfile = function (user) {
                if (user) {
                    $scope.includePath = "partials/_profile.html";
                }
            };

            $scope.goToHome = function () {
                if (user) {
                    $scope.includePath = "partials/_user.html";
                } else {
                    $scope.includePath = "partials/_home.html";
                }
            };

            $scope.logout = function () {
                dpd.users.logout(function (res, err) {
                    $scope.userLoaded = false;
                    $scope.currentUser = null;
                    $scope.includePath = "partials/_home.html";
                    $scope.$apply();
                });
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

            $scope.submitRegister = function (username, name, password, corp, confirm) {
                if (!username) {
                    alert("Username is required");
                } else if (!password) {
                    alert("Password is required");
                } else if (password !== confirm) {
                    alert("Passwords do not match");
                } else {
                    dpd.users.post({username: username, password: password, name: name, corporation: corp}, function (user, error) {
                        if (error) {
                            alert(JSON.stringify(error));
                        } else {
                            location.href = "/index.html";
                        }
                    });
                }
                return false;
            };

        });


